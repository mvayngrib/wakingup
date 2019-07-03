import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from 'screens/Home'
import TabBarIcon from 'components/Icon'
import theme from '~/theme'
import config from './config'

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    ...config,
    tabBarLabel: 'HOME',
    defaultNavigationOptions: {
      headerStyle: {
        height: 70,
        backgroundColor: theme.colors.white,
        borderBottomColor: 'transparent',
        elevation: 0, // for android
      },
    },
  }
)

HomeStack.path = ''

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
}

export default HomeStack
