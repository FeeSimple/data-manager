import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatterjs } from './scatter'
import { eosjs } from './eosjs'

export default combineReducers({
  properties,
  scatterjs,
  eosjs
})
