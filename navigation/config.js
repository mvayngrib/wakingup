import { Platform } from 'react-native'

export default Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})
