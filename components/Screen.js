import theme from '~/theme'
import Block from './Block'

export default Block.withProps({
  full: true,
  paddingHorizontal: theme.sizes.margin,
  white: true,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
})
