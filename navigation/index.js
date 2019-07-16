import { NavigationActions, StackActions } from 'react-navigation'

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

let navigator

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
export const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

export const onNavigationStateChange = (prevState, currentState, action) => {
  // propagate to redux store
  // store.dispatch(action)
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
export const navigateAndReset = (routeName, params) => {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    })
  )
}

export const back = (opts) => {
  navigator.dispatch(NavigationActions.back(opts))
}

export const scanQR = (opts, callback) =>
  navigate('Modal', {
    camera: opts,
    callback,
  })
