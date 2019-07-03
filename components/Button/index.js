import React from 'react'
import PropTypes from '~/constants/prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { P } from 'components/Text'
import { interpretProps, getPropTypes } from '~/utils/interpret-style-props'
import theme from '~/theme'
import Styles from '~/styles'

const styles = StyleSheet.create({
  ...Styles.base,
  ...Styles.bg,
  shadow: {
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.sizes.base * 3,
  },
})

const defaultButtonStyles = [styles.button]

const Button = (props) => {
  const interpreted = interpretProps({ props, styles, defaultStyles: defaultButtonStyles })
  return <TouchableOpacity {...interpreted} />
}

Button.propTypes = getPropTypes({ styles })

Button.defaultProps = {
  // flex: 1,
  // padding: theme.sizes.padding,
  opacity: 0.8,
  color: theme.colors.white,
}

export default Button
