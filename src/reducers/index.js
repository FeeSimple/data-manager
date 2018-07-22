import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatter } from './scatter'
import { eosClient } from './eosclient'
import { contracts } from './contracts'

export default combineReducers({
  properties,
  eosClient,
  scatter,
  contracts
})
