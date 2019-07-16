import { createAction } from 'redux-actions'
import createSecureStorage from '~/modules/storage'

const AUTH_LOAD_START = 'AUTH_LOAD_START'
const AUTH_LOAD_SUCCESS = 'AUTH_LOAD_SUCCESS'
const AUTH_LOAD_ERROR = 'AUTH_LOAD_ERROR'

const AUTH_SIGN_IN_START = 'AUTH_SIGN_IN_START'
const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS'
const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR'

const AUTH_SIGN_UP_START = 'AUTH_SIGN_UP_START'
const AUTH_SIGN_UP_SUCCESS = 'AUTH_SIGN_UP_SUCCESS'
const AUTH_SIGN_UP_ERROR = 'AUTH_SIGN_UP_ERROR'

const AUTH_SIGN_OUT_START = 'AUTH_SIGN_OUT_START'
const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS'
const AUTH_SIGN_OUT_ERROR = 'AUTH_SIGN_OUT_ERROR'

const storage = createSecureStorage('auth.v1')

const TOKEN_KEY = 'token'

const loadStart = createAction(AUTH_LOAD_START)
const loadSuccess = createAction(AUTH_LOAD_SUCCESS)
const loadError = createAction(AUTH_LOAD_ERROR)

const load = () => (dispatch) => {
  dispatch(loadStart())
  storage.get(TOKEN_KEY).then(loadSuccess, loadError)
}

const signInStart = createAction(AUTH_SIGN_IN_START)
const signInSuccess = createAction(AUTH_SIGN_IN_SUCCESS)
const signInError = createAction(AUTH_SIGN_IN_ERROR)

const signIn = ({ email, password }) => (dispatch, getState, { getFirebase }) => {
  dispatch(signInStart())
  getFirebase()
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => dispatch(signInSuccess(result)), (err) => dispatch(signInError(err)))
}

const signUpStart = createAction(AUTH_SIGN_UP_START)
const signUpSuccess = createAction(AUTH_SIGN_UP_SUCCESS)
const signUpError = createAction(AUTH_SIGN_UP_ERROR)

const signUp = ({ email, password }) => (dispatch, getState, { getFirebase }) => {
  dispatch(signUpStart())
  getFirebase()
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => dispatch(signUpSuccess(result)), (err) => dispatch(signUpError(err)))
}

const signOutStart = createAction(AUTH_SIGN_OUT_START)
const signOutSuccess = createAction(AUTH_SIGN_OUT_SUCCESS)
const signOutError = createAction(AUTH_SIGN_OUT_ERROR)

const signOut = () => (dispatch, getState, { getFirebase }) => {
  dispatch(signOutStart())
  getFirebase()
    .auth()
    .signOut()
    .then((result) => dispatch(signOutSuccess(result)), (err) => dispatch(signOutError(err)))
}

export const actionTypes = {
  AUTH_LOAD_START,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_ERROR,
  AUTH_SIGN_IN_START,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_UP_START,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_ERROR,
  AUTH_SIGN_OUT_START,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_ERROR,
}

export const actionCreators = {
  load,
  signIn,
  signUp,
  signOut,
}

export const initialState = Object.freeze({
  error: null,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SIGN_UP_SUCCESS:
    case AUTH_SIGN_IN_SUCCESS:
    case AUTH_SIGN_OUT_SUCCESS:
      return { ...state, error: null }
    case AUTH_SIGN_UP_ERROR:
    case AUTH_SIGN_IN_ERROR:
    case AUTH_SIGN_OUT_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
