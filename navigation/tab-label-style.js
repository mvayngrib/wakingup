import theme from '~/theme'

export default ({ focused }) => ({
  color: focused ? theme.colors.tabSelected : theme.colors.tabUnselected,
})
