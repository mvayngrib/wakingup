import React from 'react'
import { createStackNavigator } from 'react-navigation'
import TabBarIcon from 'components/Icon'
import TimerScreen from 'screens/TimerScreen'
import config from './config'

const TimerStack = createStackNavigator(
  {
    Timer: TimerScreen,
  },
  config
)

TimerStack.navigationOptions = {
  tabBarLabel: 'TIMER',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="clock" />,
}

TimerStack.path = ''

export default TimerStack
