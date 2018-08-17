import {
  ADD_PROPERTIES,
  ADD_PROPERTY,
  EDIT_PROPERTY,
  REMOVE_PROPERTY
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
    case ADD_PROPERTY: {
      return {
        ...state,
        [property.id]: property
      }
    }
    case EDIT_PROPERTY: {
      return state
    }
    case REMOVE_PROPERTY: {
      return state
    }
    default:
      return state
  }
}
