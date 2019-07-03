import React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import Styles from '~/styles'
import { interpretProps, getPropTypes } from '~/utils/interpret-style-props'
import { makeExtendable } from '~/hoc/with-props'

const styles = StyleSheet.create({
  ...Styles.base,
  ...Styles.text,
})

const defaultStyles = [Styles.text.default]

const TextWrapper = (props) => {
  const interpreted = interpretProps({ props, styles, defaultStyles })
  return <RNText {...interpreted} />
}

TextWrapper.defaultProps = {}

TextWrapper.propTypes = getPropTypes({ styles })
makeExtendable(TextWrapper)

const P = TextWrapper.withProps({ body: true })
const H1 = TextWrapper.withProps({ h1: true })
const H2 = TextWrapper.withProps({ h2: true })
const H3 = TextWrapper.withProps({ h3: true })

export default TextWrapper

export { TextWrapper as Text, P, H1, H2, H3 }

// export const P = styled.Text({
//   color: theme.colors.black,
//   fontSize: theme.fontSizes.body,
// })

// export const H1 = styled.Text({
//   color: theme.colors.black,
//   fontSize: theme.fontSizes.h1,
// })

// export const H2 = styled.Text({
//   color: theme.colors.black,
//   fontSize: theme.fontSizes.h2,
// })

// export const H3 = styled.Text({
//   color: theme.colors.black,
//   fontSize: theme.fontSizes.h3,
// })
