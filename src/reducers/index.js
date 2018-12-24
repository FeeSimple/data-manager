import { combineReducers } from 'redux'
import { properties } from './properties'
import { scatter } from './scatter'
import { eosClient } from './eosclient'
import { contracts } from './contracts'
import { accountData } from './accountData'
import { SET_LOADING, SET_ERROR_POPUP } from '../actions/types'

function isLoading (state = false, action) {
  switch (action.type) {
    case SET_LOADING: {
      return action.payload
    }
    default:
      return state
  }
}

function errMsg (state = false, action) {
  switch (action.type) {
    case SET_ERROR_POPUP: {
      return action.payload
    }
    default:
      return state
  }
}

export default combineReducers({
  properties,
  eosClient,
  scatter,
  contracts,
  accountData,
  isLoading,
  errMsg
})
