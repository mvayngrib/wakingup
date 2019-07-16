import { createSwitchNavigator } from 'react-navigation'
import AuthLoading from '~/containers/AuthLoadingScreen'
import SignUp from '~/containers/SignUpScreen'
import SignIn from '~/containers/SignInScreen'

export default createSwitchNavigator({
  AuthLoading,
  SignUp,
  SignIn,
})
