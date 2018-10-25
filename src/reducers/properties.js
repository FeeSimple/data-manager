import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_FLOORPLAN,
  ADD_FLOORPLANS
} from '../actions/types'

export function properties (state = {}, action) {
  switch (action.type) {
    case ADD_PROPERTIES: {
      const { properties } = action
      let newState = {
        ...state
      }
      properties.forEach(property => {
        newState[property.id] = {
          ...property,
          floorplans: {}
        }
      })
      return newState
    }
    case SET_PROPERTY: {
      const { property } = action
      return {
        ...state,
        [property.id]: {
          ...property,
          floorplans: {}
        }
      }
    }
    case SET_FLOORPLAN: {
      const { propertyId, floorplan } = action.payload
      const newState = { ...state }
      newState[propertyId].floorplans[floorplan.id] = floorplan
      return newState
    }
    case ADD_FLOORPLANS: {
      const { floorplans } = action.payload
      const newState = {...state}
      floorplans.map(floorplan => {
        newState[floorplan.property_id].floorplans[floorplan.id] = floorplan
        return floorplan // Only returning to resolve react warning.
      })
      return newState
    }
    default:
      return state
  }
}
