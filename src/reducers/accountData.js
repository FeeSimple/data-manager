import { SET_ACTIVE, SET_INFO } from '../actions/types'

export function accountData (state = {}, action) {
  switch (action.type) {
    case SET_ACTIVE: {
      return {
        ...state,
        active: action.payload
      }
    }
    case SET_INFO: {
      return {
        ...state,
        info: action.payload
      }
    }
    default:
      return state
  }
}
