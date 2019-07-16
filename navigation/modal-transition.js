export default ({ layout, position, scene }) => {
  const { index } = scene
  const { initHeight } = layout

  if (index === 0) {
    const scale = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [1, 1, 0.9],
    })

    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 0, 0],
    })

    return {
      transform: [{ translateY }, { scaleX: scale }, { scaleY: scale }],
    }
  }

  const translateY = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [initHeight, 60],
  })

  return {
    transform: [{ translateY }],
  }
}
