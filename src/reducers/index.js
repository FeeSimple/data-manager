import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatter } from './scatter'
import { eosClient } from './eosclient'

export default combineReducers({
  properties,
  eosClient,
  scatter
})
