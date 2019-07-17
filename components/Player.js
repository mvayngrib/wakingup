import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import styled from 'shakl'
import Slider from 'react-native-slider'
import Block from '~/components/Block'
import Row from '~/components/Row'
import Button from '~/components/Button'
import { P } from '~/components/Text'
import Icon from '~/components/Icon'
import Spread from '~/components/Spread'
import LinearGradient from '~/components/LinearGradient'
import useAudio from '~/hooks/use-audio'
import theme from '~/theme'

const ScanBackIcon = (props) => <Icon color={theme.colors.white} name="rewind" {...props} />
const ScanForwardIcon = (props) => (
  <Icon color={theme.colors.white} name="fast-forward" {...props} />
)
const PlayIcon = (props) => <Icon color={theme.colors.white} name="play" {...props} />
const PauseIcon = (props) => <Icon color={theme.colors.white} name="pause" {...props} />

const ScanBack = (props) => (
  <Button {...props}>
    <ScanBackIcon />
  </Button>
)
const ScanForward = (props) => (
  <Button {...props}>
    <ScanForwardIcon />
  </Button>
)
const Play = (props) => (
  <Button {...props}>
    <PlayIcon />
  </Button>
)
const Pause = (props) => (
  <Button {...props}>
    <PauseIcon />
  </Button>
)

const PlayPauseContainer = styled(LinearGradient)(({ radius }) => ({
  borderRadius: radius,
  width: radius * 2,
  height: radius * 2,
  justifyContent: 'center',
  alignItems: 'center',
})).attrs({
  // colors: disabled ? ['#eee', '#aaa'] : ['#2675EE', '#09A5DD'],
  colors: ['#2675EE', '#09A5DD'],
  start: { x: 0.2, y: 0.2 },
  end: { x: 0.8, y: 0.8 },
})

const padNum = (n) => {
  if (n < 10) return `0${n}`
  return String(n)
}

const formatPosition = (millis) => {
  const m = Math.floor(millis / 60000)
  const s = Math.floor((millis % 60000) / 1000)
  return `${padNum(m)}:${padNum(s)}`
}

const styles = StyleSheet.create({
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
})

const Player = React.memo(({ source, onError, onPlay, onPause }) => {
  const { state, play, pause, startSeeking, seekTo, stopSeeking, scanBack, scanForward } = useAudio(
    {
      source,
      onError,
      onPlay,
      onPause,
    }
  )

  const { isLoading, isPlaying, duration, progress } = state
  const PlayPause = isPlaying ? Pause : Play
  const formattedListened = isLoading ? '00:00' : formatPosition(duration * progress)
  const formattedRemaining = isLoading ? '' : formatPosition(duration * (1 - progress))
  const onPressScanBack = useCallback((e) => scanBack(), [scanBack])
  const onPressScanForward = useCallback((e) => scanForward(), [scanForward])
  const onPressPlayPause = isPlaying ? pause : play
  return (
    <>
      <Row spaceAround>
        <ScanBack disabled={isLoading} onPress={onPressScanBack} />
        <PlayPauseContainer disabled={isLoading} radius={35}>
          <PlayPause disabled={isLoading} onPress={onPressPlayPause} />
        </PlayPauseContainer>
        <ScanForward disabled={isLoading} onPress={onPressScanForward} />
      </Row>
      <Row>
        <Block full>
          <Spread>
            <P white>{formattedListened}</P>
            <P white>{formattedRemaining}</P>
          </Spread>
          <Slider
            thumbStyle={styles.thumb}
            thumbTintColor={theme.colors.white}
            minimumTrackTintColor={theme.colors.white}
            maximumTrackTintColor={theme.colors.gray}
            disabled={isLoading}
            value={progress}
            onValueChange={seekTo}
            onSlidingStart={startSeeking}
            onSlidingComplete={stopSeeking}
          />
        </Block>
      </Row>
    </>
  )
})

Player.displayName = 'Player'

Player.defaultProps = {
  onError: console.error,
  source: { uri: 'https://s3.amazonaws.com/mvayngrib.com/public/music/golden-years.mp3' },
}

Player.propTypes = {}

export default Player
