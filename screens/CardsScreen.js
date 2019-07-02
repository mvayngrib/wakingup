import React from 'react'
import {
  Alert,
  AppRegistry,
  Animated,
  Dimensions,
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'

const Card = ({ style, onPress }) => (
  <Animated.View style={[styles.card, style]}>
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }} />
  </Animated.View>
)

const cards = [
  { backgroundColor: '#ff0' },
  { backgroundColor: '#f0f' },
  { backgroundColor: '#0ff' },
  { backgroundColor: '#00f' },
  { backgroundColor: '#f00' },
  { backgroundColor: '#0f0' },
]

const cardHeight = 250
const cardPadding = 10
const titleHeight = 30

export default class Cards extends React.Component {
  state = { dragging: false }
  scrollY = new Animated.Value(0)
  onScroll = Animated.forkEvent(
    Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
      useNativeDriver: true,
    }),
    (e) => console.log('y offset', e.nativeEvent.contentOffset.y)
  )

  getTranslateY = (i) => {
    if (i === 0) return 0

    return this.scrollY.interpolate({
      inputRange: [-cardHeight, 0, cardPadding * i],
      outputRange: [
        (cardHeight * i) / 2,
        -(cardHeight - titleHeight) * i,
        -(cardHeight - cardPadding) * i,
      ],
      extrapolateRight: 'clamp',
    })
  }

  render() {
    const styles = cards.map((style, i) => {
      return {
        ...style,
        transform: [
          {
            translateY: this.getTranslateY(i),
          },
        ],
      }
    })

    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={StyleSheet.absoluteFill}>
            {styles.map((style, i) => (
              <Card key={String(i)} style={style} onPress={() => Alert.alert(`Tapped ${i}`)} />
            ))}
          </View>
          <Animated.ScrollView
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: cardHeight,
    borderRadius: 20,
  },
  // card1: {
  //   position: 'absolute',
  //   top: 100,
  //   left: 20,
  //   right: 20,
  //   height: 250,
  //   borderRadius: 10,
  //   backgroundColor: 'red',
  // },
  // card2: {
  //   position: 'absolute',
  //   top: 175,
  //   left: 20,
  //   right: 20,
  //   height: 250,
  //   borderRadius: 10,
  //   backgroundColor: 'purple',
  // },
  // card3: {
  //   position: 'absolute',
  //   top: 250,
  //   left: 20,
  //   right: 20,
  //   height: 250,
  //   borderRadius: 10,
  //   backgroundColor: 'orange',
  // },
})
