import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import Lesson from './component'

export default withNavigation(({ navigation }) => <Lesson {...navigation.state.params} />)
