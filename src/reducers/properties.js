import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_FLOORPLAN,
  DELETE_FLOORPLAN,
  ADD_FLOORPLANS,
  SET_UNIT,
  DELETE_UNIT,
  ADD_UNITS,
  SET_TERMPRICE,
  DELETE_TERMPRICE,
  ADD_TERMPRICES,
  DELETE_PROPERTY
} from '../actions/types'

export function properties (state = {}, action) {
  switch (action.type) {
    case ADD_PROPERTIES: {
      const { properties } = action
      let newState = {
        ...state
      }

      // In case of property deletion, the "state" still hold the already-deleted property
      // Thus, we need to cleanup the "properties" before assigning again with
      // the "properties" data loaded from chain
      newState = {}

      properties.forEach(property => {
        newState[property.id] = {
          ...property,
          floorplans: {},
          units: {}
        }
      })
      console.log('ADD_PROPERTIES - newState:', newState)
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
    case DELETE_PROPERTY: {
      const { propertyId } = action.payload
      const newState = { ...state }
      delete newState[propertyId]
      console.log('DELETE_PROPERTY - state:', newState)
      return newState
    }
    case SET_FLOORPLAN: {
      const { propertyId, floorplan } = action.payload
      const newState = { ...state }
      if (newState[propertyId]) {
        newState[propertyId].floorplans[floorplan.id] = floorplan
      }
      return newState
    }
    case ADD_FLOORPLANS: {
      const { id, floorplans } = action.payload
      const newState = { ...state }

      // In case of floorplan deletion, the "state" still hold the already-deleted floorplan
      // Thus, we need to cleanup the "floorplans" before assigning again with
      // the "floorplans" data loaded from chain
      newState[id].floorplans = {}

      if (floorplans.length == 0) {
        return newState
      }

      floorplans.map(floorplan => {
        if (newState[floorplan.property_id]) {
          newState[floorplan.property_id].floorplans[floorplan.id] = floorplan
        }
        return floorplan // Only returning to resolve react warning.
      })
      return newState
    }
    case DELETE_FLOORPLAN: {
      const { propertyId, floorplanId } = action.payload
      const newState = { ...state }
      if (newState[propertyId]) {
        delete newState[propertyId].floorplans[floorplanId]
      }
      return newState
    }
    case SET_UNIT: {
      const { propertyId, unit } = action.payload
      const newState = { ...state }
      if (newState[propertyId]) {
        newState[propertyId].units[unit.id] = unit
      }
      return newState
    }
    case DELETE_UNIT: {
      const { propertyId, unitId } = action.payload
      const newState = { ...state }
      if (newState[propertyId]) {
        delete newState[propertyId].units[unitId]
      }
      return newState
    }
    case ADD_UNITS: {
      const { id, units } = action.payload
      let newState = {
        ...state
      }

      // In case of unit deletion, the "state" still hold the already-deleted unit
      // Thus, we need to cleanup the "units" before assigning again with
      // the "units" data loaded from chain
      newState[id].units = {}

      if (units.length == 0) {
        return newState
      }

      units.forEach(unit => {
        if (newState[unit.property_id]) {
          newState[unit.property_id].units[unit.id] = {
            ...unit,
            termprices: {}
          }
        }
        return unit // Only returning to resolve react warning.
      })
      console.log('ADD_UNITS - newState:', newState)
      return newState
    }
    case SET_TERMPRICE: {
      const { id, unitid, termprice } = action.payload
      const newState = { ...state }
      if (newState[id] && newState[id].units[unitid]) {
        newState[id].units[unitid].termprices[termprice.id] = termprice
      }
      return newState
    }
    case DELETE_TERMPRICE: {
      const { propertyId, unitId, termpriceId } = action.payload
      const newState = { ...state }
      if (newState[propertyId] && newState[propertyId].units[unitId]) {
        delete newState[propertyId].units[unitId].termprices[termpriceId]
      }
      return newState
    }
    case ADD_TERMPRICES: {
      const { id, unitid, termprices } = action.payload
      let newState = {
        ...state
      }

      // In case of termprice deletion, the "state" still hold the already-deleted termprice
      // Thus, we need to cleanup the "termprices" before assigning again with
      // the "termprices" data loaded from chain
      newState[id].units[unitid].termprices = {}

      if (termprices.length == 0) {
        return newState
      }

      termprices.forEach(termprice => {
        if (newState[id] && newState[id].units[termprice.unit_id]) {
          newState[id].units[termprice.unit_id].termprices[
            termprice.id
          ] = termprice
        }
        return termprice // Only returning to resolve react warning.
      })
      console.log('ADD_TERMPRICES - newState:', newState)
      return newState
    }
    default:
      return state
  }
}
