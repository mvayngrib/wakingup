import React from 'react'
import { createStackNavigator } from 'react-navigation'
import MeditationScreen from '~/containers/MeditationScreen'
import TabBarIcon from '~/components/TabIcon'
import config from './config'

const MeditationStack = createStackNavigator(
  {
    Meditation: MeditationScreen,
  },
  config
)

MeditationStack.navigationOptions = {
  tabBarLabel: 'MEDITATION',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
}

MeditationStack.path = ''

export default MeditationScreen
