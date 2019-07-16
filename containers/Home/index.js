import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from '~/constants/prop-types'
import Home from '~/components/Home'
import { navigate } from '~/navigation'

const mapStateToProps = (state) => {
  const { lessons = [] } = state.firestore.ordered
  return {
    nextMeditationTitle: state.nextMeditationTitle || 'Nine',
    lessons,
    onSelectLesson: (i) => navigate('Modal', { screen: 'Lesson', lesson: lessons[i] }),
  }
}

// const mapDispatchToProps = (dispatch, { navigate, lessons }) => ({
//   onLikeNextMeditation: () => console.log('tapped onLikeNextMeditation'),
//   onDownloadNextMeditation: () => console.log('tapped onDownloadNextMeditation'),
// })

const HomeContainer = compose(
  connect(mapStateToProps),
  firestoreConnect(() => [{ collection: 'lessons' }])
)(Home)

export default HomeContainer
