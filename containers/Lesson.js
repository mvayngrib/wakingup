import React from 'react'
import Lesson from '~/components/Lesson'

const LessonContainer = ({ navigation, ...props }) => (
  <Lesson {...navigation.state.params} {...props} />
)

LessonContainer.navigationOptions = {
  header: null,
}

export default LessonContainer
