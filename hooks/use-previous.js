import { useEffect, useRef } from 'react'

// WARNING: shallow comparison
export default (deps) => {
  const ref = useRef(deps)
  useEffect(() => {
    ref.current = deps.slice()
  }, deps)

  return ref.current
}
