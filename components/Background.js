import React from 'react'
import Block from './Block'
import { width, height } from '~/constants/dimensions'

export default ({ color, image, ...props }) => (
  <Block
    absolute
    width={width}
    height={height}
    backgroundColor={color}
    backgroundImage={image}
    {...props}
  />
)
