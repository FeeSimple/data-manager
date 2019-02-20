import { SET_OP_RESULT } from '../actions/types'

export function opResult (state = {}, action) {
  switch (action.type) {
    case SET_OP_RESULT: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state
  }
}
