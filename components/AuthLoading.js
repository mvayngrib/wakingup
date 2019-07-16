import React, { useEffect } from 'react'
import FullScreenLoading from './FullScreenLoading'

const AuthLoadingScreen = ({ auth, navigation }) => {
  useEffect(() => {
    if (auth.isLoaded) {
      navigation.navigate(auth.isEmpty ? 'SignIn' : 'Main')
    }
  }, [auth])

  return <FullScreenLoading />
}

AuthLoadingScreen.defaultProps = {}

AuthLoadingScreen.propTypes = {}

export default AuthLoadingScreen
