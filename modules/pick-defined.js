import pick from './pick'

export default (obj) => pick(obj, Object.keys(obj))
