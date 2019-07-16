import * as SecureStore from 'expo-secure-store'

export default (namespace) => {
  const getKey = (key) => `${namespace}.${key}`
  const get = async (key) => {
    if (typeof key === 'string') {
      return SecureStore.getItemAsync(getKey(key))
    }

    return Promise.all(key.map(get))
  }

  const put = (key, value) => SecureStore.setItem(getKey(key), value)
  const del = async (key) => {
    if (typeof key === 'string') {
      await SecureStore.deleteItemAsync(getKey(key))
    } else {
      await Promise.all(key.map(del))
    }
  }

  return { get, put, del }
}
