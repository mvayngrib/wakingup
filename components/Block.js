import React from 'react'
import { View, SafeAreaView } from 'react-native'
import Styles from '~/styles'

const Block = ({
  flex,
  width,
  height,
  bottom,
  top,
  paddingHorizontal,
  paddingVertical,
  padding,
  borderWidth,
  borderColor,
  borderRadius,
  borderRadiusTopLeft,
  borderRadiusTopRight,
  borderRadiusBottomLeft,
  borderRadiusBottomRight,
  backgroundColor,
  full,
  alignLeft,
  alignRight,
  alignStart,
  alignEnd,
  roundedCorners,
  spaceBetween,
  spaceAround,
  center,
  centerXY,
  fixed,
  horizontal,
  vertical,
  alignItems,
  black,
  white,
  transparent,
  safe,
  justifyContent,
  style,
  ...props
}) => {
  const styles = [
    //
    full && Styles.base.full,
    alignLeft && Styles.base.left,
    alignRight && Styles.base.right,
    alignStart && Styles.base.alignStart,
    alignEnd && Styles.base.alignEnd,
    roundedCorners && Styles.base.roundedCorners,
    spaceBetween && Styles.base.spaceBetween,
    spaceAround && Styles.base.spaceAround,
    center && Styles.base.center,
    centerXY && Styles.base.centerXY,
    fixed && Styles.base.fixed,
    horizontal && Styles.base.horizontal,
    vertical && Styles.base.vertical,
    alignItems && { alignItems },
    black && Styles.bg.black,
    white && Styles.bg.white,
    transparent && Styles.bg.transparent,
    // overrides
    flex != null && { flex },
    width != null && { width },
    height != null && { height },
    bottom != null && { bottom },
    top != null && { top },
    paddingHorizontal != null && { paddingHorizontal },
    paddingVertical != null && { paddingVertical },
    padding != null && { padding },
    borderWidth != null && { borderWidth },
    borderRadius != null && { borderRadius },
    borderRadiusTopLeft != null && { borderRadiusTopLeft },
    borderRadiusTopRight != null && { borderRadiusTopRight },
    borderRadiusBottomLeft != null && { borderRadiusBottomLeft },
    borderRadiusBottomRight != null && { borderRadiusBottomRight },
    borderColor && { borderColor },
    backgroundColor && { backgroundColor },
    justifyContent != null && { justifyContent },
    style,
  ]

  const Comp = safe ? SafeAreaView : View

  return <Comp style={styles} {...props} />
}

Block.withProps = (defaults) => (props) => <Block {...defaults} {...props} />

export default Block
