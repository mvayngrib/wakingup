import { useState, useCallback } from 'react'

export default (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((value) => !value), [])
  return [value, toggle]
}
