import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import LessonsPage from '~/components/LessonsPage'

const LessonsScreen = compose(
  connect((state) => ({
    lessons: state.firestore.ordered.lessons,
  })),
  firestoreConnect(() => [{ collection: 'lessons' }])
)(LessonsPage)

LessonsScreen.navigationOptions = {
  headerTitle: 'LESSONS',
}

export default LessonsScreen
