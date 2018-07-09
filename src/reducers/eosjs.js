import { SET_EOSJS } from '../actions/types'

const initialState = {
  instance: null
}

export function eosjs (state = initialState, action) {  
  const { instance } = action
  switch (action.type) {      
    case SET_EOSJS: {      
      return {
        ...state,
        instance
      }
    }    
    default:
      return state
  }
}
