import React, { useCallback } from 'react'
// import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Home from './Home'
import Lessons from './Lessons'
import Meditation from './Meditation'
import Timer from './Timer'
import theme from '../theme'
import modalTransition from './modal-transition'
import Lesson from '~/containers/Lesson'

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
      // header: null,
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

const modalNavigator = createStackNavigator(
  {
    Main: tabNavigator,
    Modal: {
      screen: (props) => {
        const { params } = props.navigation.state
        if (params.screen === 'Lesson') {
          return <Lesson {...props} onClose={useCallback(() => props.navigation.goBack())} />
        }
      },
    },
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      header: null,
    },
    // otherwise borderRadius unveils StackViewCard default backgroundColor (white)
    transparentCard: true,
    transitionConfig: () => ({
      screenInterpolator: modalTransition,
      containerStyle: {
        backgroundColor: '#000',
      },
    }),
  }
)

export default modalNavigator
