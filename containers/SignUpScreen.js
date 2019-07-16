import React from 'react'
import PropTypes from '~/constants/prop-types'
import styled from 'shakl'
import Screen from 'components/Screen'
import Header from 'components/Header'
import Body from 'components/Body'
import Footer from 'components/Footer'
import { P, H1, H2 } from 'components/Text'

const SignUpScreen = (props) => {
  return (
    <Screen>
      <Header>
        <H1 left>SignUpScreen</H1>
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

SignUpScreen.defaultProps = {}

SignUpScreen.propTypes = {}

export default SignUpScreen
