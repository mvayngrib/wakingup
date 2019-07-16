import React from 'react'
import { Text as RNText } from 'react-native'
import Styles from '~/styles'

const Text = ({
  size,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  padding,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin,
  center,
  centerXY,
  h1,
  h2,
  h3,
  body,
  large,
  small,
  black,
  white,
  gray,
  bold,
  semibold,
  top,
  bottom,
  left,
  right,
  alignSelf,
  color,
  style,
  ...props
}) => {
  const styles = [
    //
    Styles.text.default,
    h1 && Styles.text.h1,
    h2 && Styles.text.h2,
    h3 && Styles.text.h3,
    body && Styles.text.body,
    large && Styles.text.large,
    small && Styles.text.small,
    center && Styles.text.center,
    black && Styles.text.black,
    white && Styles.text.white,
    gray && Styles.text.gray,
    bold && Styles.text.bold,
    semibold && Styles.text.semibold,
    // overrides
    size != null && { fontSize: size },
    padding != null && { padding },
    paddingTop != null && { paddingTop },
    paddingBottom != null && { paddingBottom },
    paddingLeft != null && { paddingLeft },
    paddingRight != null && { paddingRight },
    marginTop != null && { marginTop },
    marginBottom != null && { marginBottom },
    marginLeft != null && { marginLeft },
    marginRight != null && { marginRight },
    margin != null && { margin },
    top != null && { top },
    bottom != null && { bottom },
    left != null && typeof left === 'boolean' ? Styles.text.left : { left },
    right != null && typeof right === 'boolean' ? Styles.text.right : { right },
    alignSelf != null && { alignSelf },
    color != null && { color },
    style,
  ]

  return <RNText style={styles} {...props} />
}

Text.withProps = (defaults) => (props) => <Text {...defaults} {...props} />

export default Text

export { Text }

export const P = Text.withProps({ body: true })
export const H1 = Text.withProps({ h1: true })
export const H2 = Text.withProps({ h2: true })
export const H3 = Text.withProps({ h3: true })
