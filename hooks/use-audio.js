import { useReducer, useCallback, useEffect, useRef } from 'react'
import { Audio } from 'expo-av'

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

const logError = (name) => (err) => console.error(name, err.message)
const toSliderPosition = ({ position, duration }) => Math.floor((1000 * position) / duration) / 1000

const useAudioReducer = () => {
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case 'sound':
          return {
            ...state,
            sound: payload,
          }
        case 'status': {
          const {
            error,
            isLoaded,
            didJustFinish,
            isBuffering,
            durationMillis,
            positionMillis,
          } = payload

          const update = {
            error,
            isLoading: !(isLoaded && state.sound),
            isBuffering,
          }

          if (typeof durationMillis === 'number') {
            update.duration = durationMillis
          }

          if (state.isPlaying) {
            if (typeof positionMillis === 'number') {
              update.position = positionMillis
            }

            update.sliderPosition = toSliderPosition(update)
          }

          if (didJustFinish) {
            update.isPlaying = false
          }

          return {
            ...state,
            ...update,
          }
        }
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
          return {
            ...state,
            wasPlayingWhenSeekStarted: state.isPlaying,
            isPlaying: false,
          }
        case 'seek_stop':
          return {
            ...state,
            wasPlayingWhenSeekStarted: false,
            isPlaying: state.wasPlayingWhenSeekStarted,
          }
        case 'seek_to':
          return {
            ...state,
            sliderPosition: payload,
          }
        default:
          return state
      }
    },
    {
      isLoading: true,
      isPlaying: null,
      sound: null,
      duration: Infinity,
      position: 0,
      sliderPosition: 0,
      wasPlayingWhenSeekStarted: false,
    }
  )

  const pause = () => dispatch({ type: 'pause' })
  const play = () => dispatch({ type: 'play' })
  const startSeeking = (position) => dispatch({ type: 'seek_start', payload: position })
  const stopSeeking = () => dispatch({ type: 'seek_stop' })
  const seekTo = (position) => dispatch({ type: 'seek_to', payload: position })
  const setStatus = (payload) => dispatch({ type: 'status', payload })
  const setSound = (payload) => dispatch({ type: 'sound', payload })

  return {
    state,
    play,
    pause,
    startSeeking,
    seekTo,
    stopSeeking,
    setStatus,
    setSound,
  }
}

export default (source) => {
  const {
    state,
    play,
    pause,
    startSeeking,
    seekTo: doSeekTo,
    stopSeeking: doStopSeeking,
    setStatus,
    setSound,
  } = useAudioReducer()
  const { isLoading, isPlaying, sound, sliderPosition, position, duration } = state

  // init and destroy
  useEffect(() => {
    const promise = Audio.Sound.createAsync(source, { shouldPlay: false }, setStatus)
    promise.then(({ sound, status }) => {
      setSound(sound)
      setStatus(status)
    })

    return () => {
      promise.then(({ sound }) => sound.unloadAsync().catch(logError('unload')))
    }
  }, [])

  // play and pause
  useEffect(() => {
    if (!isLoading && typeof isPlaying === 'boolean') {
      if (isPlaying) {
        sound.playAsync().catch(logError('play'))
      } else {
        sound.pauseAsync().catch(logError('pause'))
      }
    }
  }, [sound, isPlaying, isLoading])

  // rewind a bit
  const scanBack = useCallback(
    (millis = DEFAULT_SCAN_MILLIS) => {
      if (sound) {
        const newPosition = Math.max(0, position - millis)
        sound.setPositionAsync(newPosition).catch(logError('scanBack'))
      }
    },
    [position, sound]
  )

  // fast-forward a bit
  const scanForward = useCallback(
    (millis = DEFAULT_SCAN_MILLIS) => {
      if (sound) {
        const newPosition = Math.min(duration, position + millis)
        sound.setPositionAsync(newPosition).catch(logError('scanFoward'))
      }
    },
    [duration, position, sound]
  )

  // debounce seeking
  const seekRef = useRef(sliderPosition)
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

    // set latest sliderPosition
    const sliderPos = seekRef.current
    doSeekTo(sliderPos)

    const newPosition = Math.floor(duration * sliderPos)
    sound
      .setPositionAsync(newPosition)
      .then(doStopSeeking)
      .catch(logError('stopSeeking'))
  }, [sound, duration])

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
