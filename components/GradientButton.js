import { StyleSheet } from 'react-native'
import styled from 'shakl'
import LinearGradient from '~/components/LinearGradient'
import Button from '~/components/Button'
import { interpretProps } from '~/utils/interpret-style-props'
import PropTypes from '~/constants/prop-types'

const gradientStyles = StyleSheet.create({
  default: {
    flex: 1,
  },
})

const GradientButton = ({
  gradientStart,
  gradientEnd,
  gradientLocations,
  gradientColors,
  children,
  ...props
}) => {
  const { style } = interpretProps({
    props,
    styles,
    defaultStyles: [...defaultButtonStyles, gradientStyles.default],
  })

  return (
    <Button {...props}>
      <LinearGradient
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
        locations={gradientLocations}
        style={style}
      >
        {children}
      </LinearGradient>
    </Button>
  )
}

GradientButton.defaultProps = {}

GradientButton.propTypes = {
  ...Button.propTypes,
  gradientColors: PropTypes.strings.isRequired,
  gradientStart: PropTypes.xy.isRequired,
  gradientEnd: PropTypes.xy.isRequired,
  gradientLocations: PropTypes.numbers,
}

export default GradientButton
