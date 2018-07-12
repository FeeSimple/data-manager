import {
  SET_SCATTER
} from '../actions/types'

const initialState = {
  instance: null
}

export function scatter (state = initialState, action) {
  const { instance } = action
  switch (action.type) {
    case SET_SCATTER: {
      return {
        ...state,
        instance
      }
    }
    default:
      return state
  }
}
