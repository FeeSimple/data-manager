import { SET_FSMGRCONTRACT } from '../actions/types'
import { FSMGRCONTRACT } from '../utils/consts'

export function contracts (state = {}, action) {
  const { instance } = action
  switch (action.type) {
    case SET_FSMGRCONTRACT: {
      return {
        ...state,
        [FSMGRCONTRACT]: instance
      }
    }
    default:
      return state
  }
}
