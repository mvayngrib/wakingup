import { useState, useCallback } from 'react'

export default (initialValue = true) => {
  const [value, setValue] = useState(initialValue)
  const setLoaded = useCallback(() => setValue(false), [])
  return [value, setLoaded]
}
