import React from 'react'
import PropTypes from '~/constants/prop-types'
import { SafeAreaView, Animated, View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import Styles from '~/styles'
import { interpretProps } from '~/utils/interpret-style-props'
import { withProps, makeExtendable } from '~/hoc/with-props'

const styles = StyleSheet.create({
  ...Styles.base,
  ...Styles.bg,
})

const KeyboardAvoider = withProps({
  behavior: 'position',
  keyboardVerticalOffset: 200,
})(KeyboardAvoidingView)

const Block = ({ flex, safe, animated, avoidKeyboard, ...props }) => {
  const interpreted = interpretProps({ styles, props })
  const style = [flex && { flex }, interpreted.style]

  let Container = View
  if (avoidKeyboard) {
    Container = KeyboardAvoider
  } else if (animated) {
    Container = Animated.View
  } else if (safe) {
    Container = SafeAreaView
  }

  return <Container {...interpreted} style={style} />
}

Block.propTypes = {
  flex: PropTypes.number,
  animated: PropTypes.bool,
}

Block.defaultProps = {}

makeExtendable(Block)

export default Block
