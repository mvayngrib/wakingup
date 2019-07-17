import { useMemo, useEffect } from 'react'

export default () => {
  const { cancel, isCanceled, guard } = useMemo(() => {
    let canceled
    return {
      cancel: () => (canceled = true),
      isCanceled: () => canceled,
      guard: (fn) => (...args) => !canceled && fn(...args),
    }
  })

  useEffect(() => cancel, [])
  return { isCanceled, guard }
}
