import React from 'react'
import styled from 'shakl'
import { Feather } from '@expo/vector-icons'
import theme from '~/theme'

const Icon = styled(Feather)().attrs(({ focused }) => ({
  size: 23,
  color: focused ? theme.colors.tabSelected : theme.colors.tabUnselected,
}))

export default Icon
