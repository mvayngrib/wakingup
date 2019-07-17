import React from 'react'

export const withProps = (overrides) => (Comp) => {
  const hoc = (props) => <Comp {...props} {...overrides} />
  hoc.withProps = (overrides) => withProps(overrides)(hoc)
  return hoc
}

export const makeExtendable = (Comp) => {
  Comp.withProps = getWithProps(Comp)
  return Comp
}

const getWithProps = (Comp) => (overrides) => {
  const hoc = withProps(overrides)(Comp)
  makeExtendable(hoc)
  return hoc
}
