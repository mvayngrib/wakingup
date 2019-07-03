import React from 'react'
import styled from 'shakl'
import Screen from 'components/Screen'
import Header from 'components/Header'
import Body from 'components/Body'
import Footer from 'components/Footer'
import { P, H1, H2 } from 'components/Text'
import PropTypes from '~/constants/prop-types'

const LessonsScreen = (props) => {
  return (
    <Screen>
      <Header>
        <H1 left>Lessons</H1>
      </Header>
      <Body>
        <P>body</P>
      </Body>
      <Footer>
        <P>footer</P>
      </Footer>
    </Screen>
  )
}

LessonsScreen.defaultProps = {}

LessonsScreen.propTypes = {}

LessonsScreen.navigationOptions = {
  headerTitle: 'LESSONS',
}

export default LessonsScreen
