import { omit } from 'lodash'
import PropTypes from '~/constants/prop-types'

export const interpretProps = ({ props, styles, defaultStyles = [] }) => {
  const flags = Object.keys(props).filter((flag) => flag in styles && props[flag])
  const style = flags.map((flag) => styles[flag])

  const { style: overrideStyle, ...rest } = omit(props, flags)
  return {
    ...rest,
    style: [...defaultStyles, ...style, overrideStyle],
  }
}

export const getPropTypes = ({ styles }) =>
  Object.keys(styles).reduce((propTypes, key) => {
    propTypes[key] = PropTypes.bool
    return propTypes
  }, {})
