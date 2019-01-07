import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_FLOORPLAN,
  ADD_FLOORPLANS,
  SET_UNIT,
  ADD_UNITS,
  SET_TERMPRICE,
  ADD_TERMPRICES
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
          floorplans: {},
          units: {}
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
          floorplans: {},
          units: {}
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
      const newState = { ...state }
      floorplans.map(floorplan => {
        newState[floorplan.property_id].floorplans[floorplan.id] = floorplan
        return floorplan // Only returning to resolve react warning.
      })
      return newState
    }
    case SET_UNIT: {
      const { propertyId, unit } = action.payload
      const newState = { ...state }
      newState[propertyId].units[unit.id] = unit
      return newState
    }
    case ADD_UNITS: {
      const { units } = action.payload
      let newState = { 
        ...state 
      }
      units.forEach(unit => {
        newState[unit.property_id].units[unit.id] = { 
          ...unit,
          termprices: {}
        }
        return unit // Only returning to resolve react warning.
      })
      console.log('ADD_UNITS - newState:', newState)
      return newState
    }
    case SET_TERMPRICE: {
      console.log('SET_TERMPRICE - action.payload:', action.payload)
      const { id, unitid, termprice } = action.payload
      const newState = { ...state }
      console.log('SET_TERMPRICE - newState:', newState)
      newState[id].units[unitid].termprices[termprice.id] = termprice
      console.log('SET_TERMPRICE - newState:', newState)
      return newState
    }
    case ADD_TERMPRICES: {
      const { id, unitid, termprices } = action.payload
      let newState = { 
        ...state 
      }
      termprices.forEach(termprice => {
        newState[id].units[unitid].termprices[termprice.id] = termprice
        return termprice // Only returning to resolve react warning.
      })
      console.log('ADD_TERMPRICES - newState:', newState)
      return newState
    }
    default:
      return state
  }
}
