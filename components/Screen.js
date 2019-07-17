import theme from '~/theme'
import Block from './Block'

const Screen = Block.withProps({
  full: true,
  paddingHorizontal: theme.sizes.margin,
  white: true,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
})

export default Screen
