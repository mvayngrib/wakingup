import React from 'react'
import PropTypes from '~/constants/prop-types'
import styled from 'shakl'
import Screen from '~/components/Screen'
import Header from '~/components/Header'
import Body from '~/components/Body'
import Footer from '~/components/Footer'
import { P, H1, H2 } from '~/components/Text'
import GradientButton from '~/components/GradientButton'

const Button = styled(GradientButton)().attrs({
  gradientColors: ['#4478F2', '#30AFE8'],
  gradientStart: { x: 0, y: 0 },
  gradientEnd: { x: 1, y: 1 },
})

const TimerScreen = (props) => {
  return (
    <Screen>
      <Header>
        <H1 left>TimerScreen</H1>
      </Header>
      <Body>
        <P>body</P>
      </Body>
    </Screen>
  )
}

TimerScreen.defaultProps = {}

TimerScreen.propTypes = {}

TimerScreen.navigationOptions = {
  headerTitle: 'Timer',
}

export default TimerScreen
