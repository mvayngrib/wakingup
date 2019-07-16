import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'

// import AuthNavigator from './AuthNavigator'
// import MainTabNavigator from './MainTabNavigator'

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Auth: AuthNavigator,
//       Main: MainTabNavigator,
//     },
//     {
//       initialRouteName: 'Main',
//       transparentCard: true,
//     }
//   )
// )

import Player from '~/components/Player'

export default createAppContainer(
  createStackNavigator({
    Player,
  })
)
