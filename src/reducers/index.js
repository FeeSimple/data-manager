import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatter } from './scatter'
import { eosclient } from './eosclient'

export default combineReducers({
  properties,
  eosclient,
  scatter
})
