import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LessonsScreen from 'screens/LessonsScreen'
import TabBarIcon from 'components/Icon'
import config from './config'

const LessonsStack = createStackNavigator(
  {
    Lessons: LessonsScreen,
  },
  config
)

LessonsStack.navigationOptions = {
  tabBarLabel: 'LESSONS',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="book-open" />,
}

LessonsStack.path = ''

export default LessonsStack
