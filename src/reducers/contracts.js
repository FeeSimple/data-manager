import {
  SET_FSMGRCONTRACT
} from '../actions/types'

export function contracts (state = {}, action) {
  const { instance } = action
  switch (action.type) {
    case SET_FSMGRCONTRACT: {
      return {
        ...state,
        [process.env.REACT_APP_FSMGR_ACC_NAME]: instance
      }
    }
    default:
      return state
  }
}
