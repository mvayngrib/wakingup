import PropTypes from 'prop-types'

const Extended = {
  ...PropTypes,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  xy: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  numbers: PropTypes.arrayOf(PropTypes.number),
  strings: PropTypes.arrayOf(PropTypes.string),
}

export default Extended
