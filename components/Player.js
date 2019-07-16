import React, { useCallback, useState } from 'react'
import styled from 'shakl'
import Slider from 'react-native-slider'
import Block from 'components/Block'
import Circle from 'components/Circle'
import Button from 'components/Button'
import Icon from 'components/Icon'
import LinearGradient from '~/components/LinearGradient'
import useAudio from '~/hooks/use-audio'

const ScanBackIcon = (props) => <Icon color="#fff" name="rewind" {...props} />
const ScanForwardIcon = (props) => <Icon color="#fff" name="fast-forward" {...props} />
const PlayIcon = (props) => <Icon color="#000" name="play" {...props} />
const PauseIcon = (props) => <Icon color="#000" name="pause" {...props} />

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
})).attrs(({ disabled }) => ({
  colors: disabled ? ['#eee', '#aaa'] : ['#f8f', '#ff0'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))

const Player = React.memo(({ source }) => {
  const { state, play, pause, startSeeking, seekTo, stopSeeking, scanBack, scanForward } = useAudio({
    source,
    onError: console.error
  })

  const { isLoading, isPlaying, sliderPosition } = state
  const PlayPause = isPlaying ? Pause : Play
  return (
    <Block full>
      <Block height={100} />
      <Block horizontal spaceAround backgroundColor="black">
        <ScanBack disabled={isLoading} onPress={useCallback((e) => scanBack(), [scanBack])} />
        <PlayPauseContainer disabled={isLoading} radius={30}>
          <PlayPause disabled={isLoading} onPress={isPlaying ? pause : play} />
        </PlayPauseContainer>
        <ScanForward
          disabled={isLoading}
          onPress={useCallback((e) => scanForward(), [scanForward])}
        />
      </Block>
      <Block full horizontal>
        <Block full>
          <Slider
            disabled={isLoading}
            value={sliderPosition}
            onValueChange={seekTo}
            onSlidingStart={startSeeking}
            onSlidingComplete={stopSeeking}
          />
        </Block>
      </Block>
    </Block>
  )
})

Player.defaultProps = {
  source: { uri: 'https://s3.amazonaws.com/mvayngrib.com/public/music/golden-years.mp3' },
}

Player.propTypes = {}

export default Player
