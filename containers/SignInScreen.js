import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from '~/constants/prop-types'
import styled from 'shakl'
import { connect } from 'react-redux'
import Screen from '~/components/Screen'
import Block from '~/components/Block'
import Header from '~/components/Header'
import Body from '~/components/Body'
import Footer from '~/components/Footer'
import { P, H1, H2 } from '~/components/Text'
import Input from '~/components/TextInput'
import { actions } from '~/store'
import Button from '~/components/Button'
import { navigate } from '~/navigation'

const SignInScreen = ({ signIn, signUp, isAuthenticated, onAuthenticated, error }) => {
  const [isSigningIn, setSigningIn] = useState(true)
  const toggleSigningIn = useCallback(() => setSigningIn((value) => !value), [])
  const [email, setEmail] = useState('mvayngrib@gmail.com')
  const [password, setPassword] = useState('1234567890')
  const submit = useCallback(() => {
    const authenticate = isSigningIn ? signIn : signUp
    authenticate({ email, password })
  }, [email, password, isSigningIn])

  useEffect(() => {
    if (isAuthenticated) {
      onAuthenticated()
    }
  }, [isAuthenticated])

  return (
    <Screen>
      <Block full safe center>
        <Header center>
          <H1>{isSigningIn ? 'Sign In' : 'Sign Up'}</H1>
        </Header>
        <Block full center>
          <P>Email</P>
          <Input value={email} onChangeText={setEmail} />
          <P>Password</P>
          <Input secureTextEntry value={password} onChangeText={setPassword} />
          <Button onPress={submit}>
            <P>Submit</P>
          </Button>
          {error && <P>{error.message}</P>}
        </Block>
        <Footer>
          <P>{isSigningIn ? "Don't have an account?" : 'Already have an account?'}</P>
          <Button onPress={toggleSigningIn}>
            <P>{isSigningIn ? 'Sign Up' : 'Sign In'}</P>
          </Button>
        </Footer>
      </Block>
    </Screen>
  )
}

export default connect(
  (state) => ({
    error: state.auth.error,
    isAuthenticated: !!state.firebase.auth.uid,
  }),
  (dispatch) => ({
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    signUp: (credentials) => dispatch(actions.signUp(credentials)),
    onAuthenticated: () => navigate('Main'),
  })
)(SignInScreen)
