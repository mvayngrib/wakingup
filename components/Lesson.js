import React, { useReducer, useRef } from 'react'
import { Image } from 'react-native'
import styled from 'shakl'
import Behavior from '@exodus/haraka'
import Block from '~/components/Block'
import Row from '~/components/Row'
import Col from '~/components/Col'
import { P } from '~/components/Text'
import Player from '~/components/Player'
import Icon from '~/components/Icon'
import Button from '~/components/Button'
import Spread from '~/components/Spread'
import theme from '~/theme'

const StyledImage = styled(Image)({
  flex: 1,
  width: null,
  height: 250,
  borderRadius: 10,
}).attrs({ resizeMode: 'cover' })

const BodyContainer = Block.withProps({
  full: true,
  alignItems: 'center',
})

const LikeIcon = (props) => <Icon color={theme.colors.white} name="heart" {...props} />
const DownloadIcon = (props) => <Icon color={theme.colors.white} name="download-cloud" {...props} />

const Like = (props) => (
  <Button {...props}>
    <LikeIcon />
  </Button>
)
const Download = (props) => (
  <Button {...props}>
    <DownloadIcon />
  </Button>
)

const createFSAFactory = (dispatch) => (type) => (payload) => dispatch({ type, payload })

const IMAGE_BLOCK_STATES = [{ scale: 1 }, { scale: 1.2 }]

const Lesson = ({ lesson, onClose, onLike, onDownload }) => {
  const [state, dispatch] = useReducer((state, { type }) => {
    switch (type) {
      case 'load':
        return { ...state, loaded: true }
      case 'play':
        return { ...state, playing: true }
      case 'pause':
        return { ...state, playing: false }
    }
  }, {})

  const source = useRef({ uri: lesson.image }).current
  const createAction = createFSAFactory(dispatch)

  const onPlay = createAction('play')
  const onPause = createAction('pause')
  const onLoad = createAction('load')

  const { playing } = state
  return (
    <Block full backgroundColor={theme.colors.ternary}>
      <BodyContainer>
        <Button onPress={onClose}>
          <Icon color={theme.colors.white} size={30} name="chevron-down" />
        </Button>
        <Behavior state={IMAGE_BLOCK_STATES} currentState={playing ? 1 : 0}>
          <Block width={250} marginTop={20}>
            <Block height={250}>
              <StyledImage source={source} />
            </Block>
          </Block>
        </Behavior>
        <Block marginTop={70}>
          <P white bold center size={30}>
            {lesson.title}
          </P>
          <P white center size={20}>
            {lesson.type || 'Meditation Lesson'}
          </P>
        </Block>
      </BodyContainer>
      <Block marginHorizontal={30} marginBottom={80}>
        <Row>
          <Col full>
            <Player onLoad={onLoad} onPlay={onPlay} onPause={onPause} />
          </Col>
        </Row>
        <Spread>
          <Like onPress={onLike} />
          <Download onPress={onDownload} />
        </Spread>
      </Block>
      <Block safe />
    </Block>
  )
}

Lesson.defaultProps = {}

Lesson.propTypes = {}

export default Lesson
