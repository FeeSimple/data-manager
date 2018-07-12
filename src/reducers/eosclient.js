import { SET_EOSCLIENT } from '../actions/types'

const initialState = {
  instance: null
}

export function eosClient (state = initialState, action) {
  const { instance } = action
  switch (action.type) {
    case SET_EOSCLIENT: {
      return {
        ...state,
        instance
      }
    }
    default:
      return state
  }
}
