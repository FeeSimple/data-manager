import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_FLOORPLANS
} from '../actions/types'

export function properties (state = {}, action) {
  switch (action.type) {
    case ADD_PROPERTIES: {
      const { properties } = action
      let newState = {
        ...state
      }
      properties.forEach(p => {
        newState[p.id] = p
      })
      return newState
    }
    case SET_PROPERTY: {
      const { property } = action
      return {
        ...state,
        [property.id]: property
      }
    }
    case SET_FLOORPLANS: {
      const { propertyId, floorplans } = action.payload
      const newState = {...state}
      Object.keys(floorplans).map(floorplanId => {
        newState[propertyId] = {
          ...newState[propertyId],
          [floorplanId]: floorplans[floorplanId]
        }
        return floorplanId // No need to return. OOnly added to avoid warnings.
      })
      return newState
    }
    default:
      return state
  }
}
