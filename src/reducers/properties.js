import {
  ADD_PROPERTIES,
  SET_PROPERTY  
} from '../actions/types'

export function properties (state = {}, action) {
  const { properties, property } = action
  switch (action.type) {
    case ADD_PROPERTIES: {
      let newState = {
        ...state
      }
      properties.forEach(p => {
        newState[p.id] = p
      })
      return newState
    }
    case SET_PROPERTY: {
      return {
        ...state,
        [property.id]: property
      }
    }
    default:
      return state
  }
}
