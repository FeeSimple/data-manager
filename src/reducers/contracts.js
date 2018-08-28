import {
  SET_FSMGRCONTRACT
} from '../actions/types'

export function contracts (state = {}, action) {
  const { instance } = action
  switch (action.type) {
    case SET_FSMGRCONTRACT: {
      return {
        ...state,
        'fsmgrcode111': instance
      }
    }
    default:
      return state
  }
}
