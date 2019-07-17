import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Styles from '~/styles'

const defaultStyle = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Button = ({
  flex,
  full,
  center,
  centerXY,
  alignLeft,
  alignRight,
  alignStart,
  alignEnd,
  fixed,
  top,
  bottom,
  left,
  right,
  black,
  white,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style,
  ...props
}) => {
  const styles = [
    //
    defaultStyle.button,
    typeof flex === 'number' && { flex },
    full && Styles.base.full,
    center && Styles.base.center,
    centerXY && Styles.base.centerXY,
    alignLeft && Styles.base.left,
    alignRight && Styles.base.right,
    alignStart && Styles.base.alignStart,
    alignEnd && Styles.base.alignEnd,
    fixed && Styles.base.fixed,
    typeof top === 'number' && { top },
    typeof bottom === 'number' && { bottom },
    typeof left === 'number' && { left },
    typeof right === 'number' && { right },
    black && Styles.bg.black,
    white && Styles.bg.white,
    marginTop != null && { marginTop },
    marginBottom != null && { marginBottom },
    marginLeft != null && { marginLeft },
    marginRight != null && { marginRight },
    style,
  ]

  return <TouchableOpacity style={styles} {...props} />
}

Button.defaultProps = {
  hitSlop: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,
  },
}

export default Button
