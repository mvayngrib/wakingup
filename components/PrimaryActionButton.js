import React from 'react'
import theme from '~/theme'
import Button from './Button'
import { P } from './Text'

const PrimaryActionButton = ({ children, ...props }) => (
  <Button {...props}>
    <P full center white>
      {children}
    </P>
  </Button>
)

PrimaryActionButton.defaultProps = {
  primary: true,
}

export default PrimaryActionButton
