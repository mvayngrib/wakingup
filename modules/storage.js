import { AsyncStorage } from 'react-native'

export default (namespace) => {
  const getKey = (key) => `${namespace}.${key}`
  const get = async (key) => {
    if (typeof key === 'string') {
      return AsyncStorage.getItem(getKey(key))
    }

    return AsyncStorage.multiGet(key.map(getKey))
  }

  const put = (key, value) => AsyncStorage.setItem(getKey(key), value)

  const del = async (key) => {
    if (typeof key === 'string') {
      await AsyncStorage.removeItem(getKey(key))
    } else {
      await AsyncStorage.multiRemove(key.map(getKey))
    }
  }

  return { get, put, del }
}
