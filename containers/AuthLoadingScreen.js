import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AuthLoading from '~/components/AuthLoading'

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
})

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(AuthLoading)
