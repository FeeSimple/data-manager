import { SET_EOSJS } from '../actions/types'

const initialState = {
  eosjs: null
}

export function eosjs (state = initialState, action) {
  const { eosjs } = action
  switch (action.type) {      
    case SET_EOSJS: {
      return {
        ...state,
        eosjs
      }
    }    
    default:
      return state
  }
}
