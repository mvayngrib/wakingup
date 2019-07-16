import React from 'react'
import PropTypes from '~/constants/prop-types'
import { FlatList } from 'react-native'
import Item from './CardStripItem'

const CardStrip = ({ items, onSelect, itemStyle }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={items}
      keyExtractor={(item) => item.title}
      renderItem={({ item, index }) => {
        return <Item {...item} style={itemStyle} onPress={() => onSelect(index)} />
      }}
    />
  )
}

CardStrip.defaultProps = {}

CardStrip.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default CardStrip
