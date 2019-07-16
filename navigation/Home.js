import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from '~/containers/Home'
import TabBarIcon from '~/components/TabIcon'

const HomeStack = createStackNavigator(
  {
    Home,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    transparentCard: true,
    transitionConfig: () => ({
      // otherwise borderRadius unveils StackViewCard default backgroundColor (white)
      containerStyle: {
        backgroundColor: 'transparent',
      },
    }),
  }
)

HomeStack.path = ''

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
}

export default HomeStack
