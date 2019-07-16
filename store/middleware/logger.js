export default (store) => (next) => (action) => {
  if (__DEV__) console.log(action)

  return next(action)
}
