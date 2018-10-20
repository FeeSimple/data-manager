import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_FLOORPLAN
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
    case SET_FLOORPLAN: {
      const { propertyId, floorplan } = action.payload
      const newState = {...state}
      newState[propertyId] = {
        ...newState[propertyId],
        floorplans: {
          ...newState[propertyId].floorplans,
          [floorplan.id]: floorplan
        }
      }
      return newState
    }
    default:
      return state
  }
}
