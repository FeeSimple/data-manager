import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatter } from './scatter'
import { eosjs } from './eosjs'

export default combineReducers({
  properties,
  eosjs,
  scatter
})
