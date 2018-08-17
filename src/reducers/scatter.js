import {
  SET_SCATTER,
  SET_NETWORK
} from '../actions/types'

const initialState = {
  instance: null,
  network: null
}

export function scatter (state = initialState, action) {
  const { instance, network } = action
  switch (action.type) {
    case SET_SCATTER: {
      return {
        ...state,
        instance
      }
    }
    case SET_NETWORK: {
      return {
        ...state,
        network
      }
    }
    default:
      return state
  }
}
