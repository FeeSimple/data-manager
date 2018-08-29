import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatter } from './scatter'
import { eosClient } from './eosclient'
import { contracts } from './contracts'
import { accountData } from './accountData'

export default combineReducers({
  properties,
  eosClient,
  scatter,
  contracts,
  accountData
})
