import { Audio } from 'expo-av'

const addErrorTypes = (obj) =>
  transformMethods(obj, (method) => (...args) =>
    obj[method](...args).catch((err) => {
      err.type = method
      throw err
    })
  )

const shareQueue = (obj) => {
  let waitFor = Promise.resolve()

  const oneAtATime = (method) => (...args) => {
    let canceled
    // allow caller to handle rejections, but still accept the next call
    waitFor = waitFor.finally(() => {
      if (!canceled) {
        return obj[method](...args)
      }
    })

    waitFor.cancel = () => (canceled = true)
    return waitFor
  }

  return transformMethods(obj, oneAtATime)
}

const transformMethods = (obj, mapper) => {
  const transformed = {}

  Object.keys(obj).forEach((method) => {
    transformed[method] = mapper(method)
  })

  return transformed
}

const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))

const toSafeSound = (sound) => {
  const api = {
    play: sound.playAsync.bind(sound),
    pause: sound.pauseAsync.bind(sound),
    setPosition: sound.setPositionAsync.bind(sound),
    unload: sound.unloadAsync.bind(sound),
  }

  return compose(
    shareQueue,
    addErrorTypes
  )(api)
}

const create = async (...args) => {
  const { sound, status } = await Audio.Sound.createAsync(...args)
  return {
    sound: toSafeSound(sound),
    status,
  }
}

export default { create }
