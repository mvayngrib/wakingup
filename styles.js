import { StyleSheet } from 'react-native'
import theme from '~/theme'

const defaultTextStyle = {
  // fontFamily: 'OpenSans',
}

const base = StyleSheet.create({
  full: {
    flex: 1,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
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
  fixed: {
    position: 'absolute',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  alignStart: {
    alignSelf: 'flex-start',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  screen: {
    flex: 1,
    marginHorizontal: theme.sizes.margin,
  },
  roundedCorners: {
    borderRadius: 10,
  },
})

const bg = StyleSheet.create({
  white: {
    backgroundColor: theme.colors.white,
  },
  black: {
    backgroundColor: theme.colors.black,
  },
  transparent: {
    backgroundColor: 'transparent',
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
  large: {
    fontSize: theme.fontSizes.large,
  },
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '600',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  center: {
    textAlign: 'center',
  },
})

export default { base, bg, text }
