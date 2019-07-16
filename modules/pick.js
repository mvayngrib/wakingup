export default (obj, keys) => {
  const picked = {}
  for (const key of keys) {
    const val = obj[key]
    if (typeof val !== 'undefined') {
      picked[key] = val
    }
  }

  return picked
}
