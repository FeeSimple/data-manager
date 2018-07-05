import {
    SET_SCATTER,
    SET_IDENTITY    
  } from '../actions/types'
  
  const initialState = {
    scatter: null,
    identity: null
  }
  
  export function scatterjs (state = initialState, action) {
    const { scatter, identity } = action
    switch (action.type) {      
      case SET_SCATTER: {
        return {
          ...state,
          scatter
        }
      }
      case SET_IDENTITY: {
        return {
          ...state,
          identity
        }
      }
      default:
        return state
    }
  }
  