import React from 'react'
// import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Home from './Home'
import Lessons from './Lessons'
import Meditation from './Meditation'
import Timer from './Timer'
import theme from '../theme'

const tabNavigator = createBottomTabNavigator(
  {
    Home,
    Lessons,
    Meditation,
    Timer,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // headerLeftContainerStyle: {
      //   alignItems: 'center',
      //   marginLeft: theme.sizes.margin,
      // },
      // headerRightContainerStyle: {
      //   alignItems: 'center',
      //   marginRight: theme.sizes.margin,
      // },
      // headerBackTitle: null,
      // headerBackImage: <Icon name="close" />,
      // headerBackImage: <Icon name="back" />,
    },
    tabBarOptions: {
      activeTintColor: theme.colors.tabSelected,
      inactiveTintColor: theme.colors.tabUnselected,
      // allowFontScaling: false,
    },
  }
)

tabNavigator.path = ''

export default tabNavigator
