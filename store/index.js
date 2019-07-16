import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools as compose } from 'redux-devtools-extension'
import { firebaseReducer, getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore'

import firebase from '~/config/firebase'

import auth, { actionCreators as authActions } from './auth'
import logger from './middleware/logger'

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore }), logger]

const rootReducer = combineReducers({
  auth,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export const initialState = { firebase: {}, firestore: {} }

const store = createStore(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase, {
      userProfile: 'users',
      attachAuthIsReady: true,
      useFirestoreForProfile: true,
    }),
    reduxFirestore(firebase),
    applyMiddleware(...middleware)
  )
)

store.firebaseAuthIsReady.then(stuff => {
  console.log({state:store.getState()})
})

export const actions = { ...authActions }

actions.signIn({ email: 'abc', password: '123' })

export default store
