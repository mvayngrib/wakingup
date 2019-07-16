import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'

const Circle = ({ radius, ...props }) => (
  <Block centerXY borderRadius={radius} width={radius * 2} height={radius * 2} {...props} />
)

Circle.propTypes = {
  radius: PropTypes.number.isRequired,
}

export default Circle
