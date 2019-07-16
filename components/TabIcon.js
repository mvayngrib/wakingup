import theme from '~/theme'
import Icon from './Icon'

const TabIcon = Icon.extend(({ focused }) => ({
  color: focused ? theme.colors.tabSelected : theme.colors.tabUnselected,
}))

export default TabIcon
