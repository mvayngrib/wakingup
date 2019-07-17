import { useReducer, useCallback, useEffect, useRef } from 'react'
import useToggle from './use-toggle'
import createCancelGuard from './guard-cancel'
import Audio from '~/modules/audio'

const DEFAULT_SCAN_MILLIS = 15000
const DEBOUNCE_SEEK_MILLIS = 100

// status update:
// {
//   isLoaded,
//   error,
//   uri,
//   progressUpdateIntervalMillis,
//   durationMillis,
//   positionMillis,
//   playableDurationMillis,
//   shouldPlay,
//   isPlaying,
//   isBuffering,
//   rate,
//   shouldCorrectPitch,
//   pitchCorrectionQuality,
//   volume,
//   isMuted,
//   isLooping,
//   didJustFinish,
// }

const warn = (err) => console.warn(err)
const toProgress = ({ position, duration }) => Math.floor((1000 * position) / duration) / 1000
const toPosition = ({ progress, duration }) => Math.floor(progress * duration)
const createFSAFactory = (dispatch) => (type) => (payload) => dispatch({ type, payload })

const updateWithStatus = (state, status) => {
  const {
    error,
    isLoaded,
    isPlaying,
    didJustFinish,
    isBuffering,
    durationMillis,
    positionMillis,
  } = status

  const update = {
    error,
    isLoading: !(isLoaded && state.sound),
    isBuffering,
  }

  if (typeof durationMillis === 'number') {
    update.duration = durationMillis
  }

  if (isPlaying) {
    if (typeof positionMillis === 'number') {
      update.position = positionMillis
    }

    update.progress = toProgress(update)
  }

  if (didJustFinish) {
    update.isPlaying = false
  }

  return {
    ...state,
    ...update,
  }
}

const useAudioReducer = () => {
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case 'sound':
          return {
            ...state,
            sound: payload,
          }
        case 'status':
          return updateWithStatus(state, payload)
        case 'play':
          return {
            ...state,
            isPlaying: true,
          }
        case 'pause':
          return {
            ...state,
            isPlaying: false,
          }
        case 'seek_start':
          if (state.isSeeking) return state

          return {
            ...state,
            wasPlayingWhenSeekStarted:
              typeof state.wasPlayingWhenSeekStarted === 'boolean'
                ? state.wasPlayingWhenSeekStarted
                : state.isPlaying,
            isSeeking: true,
            isPlaying: false,
          }
        case 'seek_stop':
          return {
            ...state,
            isSeeking: false,
          }
        case 'seek_to':
          return {
            ...state,
            progress: payload,
          }
        case 'play_if_was_playing_when_seek_started':
          if (typeof state.wasPlayingWhenSeekStarted !== 'boolean') {
            return state
          }

          return {
            ...state,
            // clear flag
            wasPlayingWhenSeekStarted: null,
            isPlaying: !!state.wasPlayingWhenSeekStarted,
          }
        default:
          return state
      }
    },
    {
      isLoading: true,
      sound: null,
      duration: Infinity,
      position: 0,
      manualPosition: 0,
      progress: 0,
      // tri-state bools to allow skipping first render (null, true, false)
      isPlaying: null,
      isSeeking: null,
      wasPlayingWhenSeekStarted: null,
      isUnmounted: false,
    }
  )

  const createAction = createFSAFactory(dispatch)

  const pause = createAction('pause')
  const play = createAction('play')
  const startSeeking = createAction('seek_start')
  const stopSeeking = createAction('seek_stop')
  const seekTo = createAction('seek_to')
  const setStatus = createAction('status')
  const setSound = createAction('sound')
  const playIfWasPlayingWhenSeekStarted = createAction('play_if_was_playing_when_seek_started')

  return {
    state,
    play,
    pause,
    startSeeking,
    seekTo,
    stopSeeking,
    setStatus,
    setSound,
    playIfWasPlayingWhenSeekStarted,
  }
}

export default ({ source, onError = warn, onPlay, onPause }) => {
  const {
    state,
    play,
    pause,
    startSeeking,
    seekTo: doSeekTo,
    stopSeeking: doStopSeeking,
    setStatus,
    setSound,
    playIfWasPlayingWhenSeekStarted,
  } = useAudioReducer()

  const { isLoading, isPlaying, isSeeking, sound, duration, progress } = state
  const [cacheBuster, bustCache] = useToggle(null)
  const { isCanceled, guard } = createCancelGuard()

  // init and destroy
  useEffect(() => {
    const promise = Audio.create(source, { shouldPlay: false }, guard(setStatus))
    promise.then(
      guard(({ sound, status }) => {
        setSound(sound)
        setStatus(status)
      })
    )

    return () => {
      clearTimeout(seekTimeoutRef.current)
      promise.then(({ sound }) => sound.unload().catch(console.error))
    }
  }, [])

  // play and pause
  useEffect(() => {
    if (!isLoading && typeof isPlaying === 'boolean') {
      if (isPlaying) {
        sound.play().then(guard(onPlay), guard(onError))
      } else {
        sound.pause().then(guard(onPause), guard(onError))
      }
    }
  }, [sound, isPlaying, isLoading])

  // rewind a bit
  const scan = useCallback(
    (millis = DEFAULT_SCAN_MILLIS, reverse) => {
      if (!sound) return

      const newPosition = reverse
        ? Math.max(0, toPosition({ progress, duration }) - millis)
        : Math.min(duration, toPosition({ progress, duration }) + millis)

      seekTo(newPosition / duration)
      bustCache()
    },
    [duration, progress, sound]
  )

  const scanForward = scan
  const scanBack = (millis) => scan(millis, true)

  // debounce seeking
  const seekRef = useRef(0)
  const seekTimeoutRef = useRef(null)
  const seekTo = useCallback((value) => {
    seekRef.current = value
    clearTimeout(seekTimeoutRef.current)
    seekTimeoutRef.current = setTimeout(() => {
      doSeekTo(value)
    }, DEBOUNCE_SEEK_MILLIS)
  }, [])

  const stopSeeking = useCallback(() => {
    clearTimeout(seekTimeoutRef.current)
    doSeekTo(seekRef.current)
    doStopSeeking()
  }, [sound, duration])

  // bust cache when done seeking...
  useEffect(() => {
    if (isSeeking === false) bustCache()
  }, [isSeeking, bustCache])

  // ...and only then set the sound position
  useEffect(() => {
    // ignore first render
    if (cacheBuster == null) return

    const set = async () => {
      if (isCanceled()) return

      const progress = seekRef.current
      const position = toPosition({ progress, duration })
      try {
        await sound.setPosition(position).catch(guard(onError))
      } catch (err) {
        console.error('failed to set position', err.message)
        return
      }

      if (isCanceled()) return

      if (seekRef.current === progress) {
        playIfWasPlayingWhenSeekStarted()
      } else {
        // requests got queued up, try again
        set()
      }
    }

    set()
  }, [cacheBuster])

  return {
    state,
    startSeeking,
    seekTo,
    stopSeeking,
    scanBack,
    scanForward,
    play,
    pause,
  }
}
