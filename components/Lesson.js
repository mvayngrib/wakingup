import React from 'react'
import { Image } from 'react-native'
import styled from 'shakl'
import Screen from '~/components/Screen'
import Block from '~/components/Block'
import Header from '~/components/Header'
import Body from '~/components/Body'
import Footer from '~/components/Footer'
import { P, H1, H2 } from '~/components/Text'
import PropTypes from '~/constants/prop-types'
import Icon from '~/components/Icon'
import Button from './Button'
import theme from '../theme'
import Player from './Player'

const StyledImage = styled(Image)({
  flex: 1,
  width: null,
  height: 250,
  borderRadius: 10,
}).attrs({ resizeMode: 'cover' })

const BodyContainer = Body.extend({ alignItems: 'center' })

const Lesson = ({ lesson, onClose }) => {
  return (
    <Screen backgroundColor={theme.colors.primary}>
      <BodyContainer>
        <Button onPress={onClose} marginBottom={20}>
          <Icon size={30} name="chevron-down" />
        </Button>
        <Block full width={250} marginBottom={50}>
          <Block height={250}>
            <StyledImage source={{ uri: lesson.image }} />
          </Block>
        </Block>
        <P size={30} bold>
          {lesson.title}
        </P>
        <P size={20}>{lesson.type || 'Meditation Lesson'}</P>
      </BodyContainer>
      <Player source={lesson.audio} />
      <Footer>
        <P>footer</P>
      </Footer>
    </Screen>
  )
}

Lesson.defaultProps = {}

Lesson.propTypes = {}

export default Lesson
