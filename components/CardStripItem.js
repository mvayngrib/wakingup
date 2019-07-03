import React from 'react'
import { Image } from 'react-native'
import styled from 'shakl'
import Block from 'components/Block'
import PropTypes from '~/constants/prop-types'
import MediaContainer from 'components/MediaContainer'
import { P, H1, H2 } from 'components/Text'

const Card = ({ title, subtitle, image, style }) => {
  return (
    <Block style={style}>
      <MediaContainer>
        <Image source={image} resizeMode="cover" />
      </MediaContainer>
      <H2>{title}</H2>
      <P black>{subtitle}</P>
    </Block>
  )
}

Card.defaultProps = {}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
}

export default Card
