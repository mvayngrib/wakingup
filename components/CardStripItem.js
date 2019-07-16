import React from 'react'
import { Image, StyleSheet } from 'react-native'
import styled from 'shakl'
import Block from '~/components/Block'
import PropTypes from '~/constants/prop-types'
import MediaContainer from '~/components/MediaContainer'
import { P, H1, H2 } from '~/components/Text'

const Container = styled.Touchable(({ width }) => ({
  width,
  marginRight: 20,
}))

const CardImage = styled(Image)(({ width, height }) => ({
  width,
  height,
})).attrs({ resizeMode: 'cover', borderRadius: 7 })

const Card = ({ title, subtitle, image, imageWidth, imageHeight, onPress }) => {
  const dimensions = { width: imageWidth, height: imageHeight }
  return (
    <Container width={imageWidth} onPress={onPress}>
      <CardImage source={{ uri: image }} width={imageWidth} height={imageHeight} />
      <H2>{title}</H2>
      <P black>{subtitle}</P>
    </Container>
  )
}

Card.defaultProps = {
  imageWidth: 130,
  imageHeight: 80,
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
}

export default Card
