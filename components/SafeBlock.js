import React from 'react'
import Block from './Block'
import { makeExtendable } from '~/hoc/with-props'

const SafeBlock = (props) => <Block safe {...props} />

export default makeExtendable(SafeBlock)
