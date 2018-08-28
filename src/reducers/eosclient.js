import { SET_EOSCLIENT } from '../actions/types'

export function eosClient (state = {}, action) {
  const { eosClient } = action
  switch (action.type) {
    case SET_EOSCLIENT: {
      return eosClient
    }
    default:
      return state
  }
}
