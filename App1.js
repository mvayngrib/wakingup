import { AppLoading } from 'expo'
import { Audio } from 'expo-av'
// import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

// import Firebase from '~/containers/Firebase'
import { setTopLevelNavigator } from '~/navigation'
import AppNavigator from '~/navigation/AppNavigator'
import store from '~/store'

Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: true,
}).catch((err) => {
  console.error('audio could not be enabled', err)
})

// StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily)

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <Provider store={store}>
        <AppNavigator ref={setTopLevelNavigator} />
      </Provider>
    </View>
  )
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
    }),
  ])
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})
