import { SET_SCATTER } from '../actions/types'

export function scatter (state = {}, action) {
  const { instance } = action
  switch (action.type) {
    case SET_SCATTER: {
      return instance
    }
    default:
      return state
  }
}
