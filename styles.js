import { StyleSheet } from 'react-native'
import theme from '~/theme'

const defaultTextStyle = {
  fontFamily: 'Cera Pro',
  fontWeight: 'bold',
}

const base = StyleSheet.create({
  full: {
    flex: 1,
  },
  top: {
    justifyContent: 'flex-start',
  },
  left: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  right: {
    justifyContent: 'flex-end',
  },
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
  },
  centerXY: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  screen: {
    flex: 1,
    marginHorizontal: theme.sizes.margin,
  },
})

const bg = StyleSheet.create({
  white: {
    backgroundColor: theme.colors.white,
  },
  black: {
    backgroundColor: theme.colors.black,
  },
  gray: {
    backgroundColor: theme.colors.gray,
  },
  lightGray: {
    backgroundColor: theme.colors.lightGray,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  actionBar: {
    backgroundColor: theme.colors.actionBar,
  },
})

const text = StyleSheet.create({
  default: defaultTextStyle,
  white: {
    color: theme.colors.white,
  },
  black: {
    color: theme.colors.black,
  },
  gray: {
    color: theme.colors.gray,
  },
  lightGray: {
    color: theme.colors.lightGray,
  },
  primary: {
    color: theme.colors.primary,
  },
  secondary: {
    color: theme.colors.secondary,
  },
  error: {
    color: theme.colors.error,
  },
  h1: {
    fontSize: theme.fontSizes.h1,
    color: theme.colors.title,
  },
  h2: {
    fontSize: theme.fontSizes.h2,
  },
  h3: {
    fontSize: theme.fontSizes.h3,
  },
  body: {
    fontSize: theme.fontSizes.body,
  },
  small: {
    fontSize: theme.fontSizes.small,
  },
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  center: {
    textAlign: 'center',
  },
})

export default { base, bg, text }
