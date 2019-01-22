import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_SCATTER,
  SET_EOSCLIENT,
  SET_FSMGRCONTRACT,
  SET_NETWORK,
  SET_ACTIVE,
  SET_INFO,
  SET_LOADING,
  SET_ERROR_POPUP,
  SET_FLOORPLAN,
  ADD_FLOORPLANS,
  SET_UNIT,
  DELETE_UNIT,
  DELETE_TERMPRICE,
  DELETE_FLOORPLAN,
  ADD_UNITS,
  SET_TERMPRICE,
  ADD_TERMPRICES
} from '../actions/types'

export function addFloorplans (id, floorplans) {
  return {
    type: ADD_FLOORPLANS,
    payload: { id, floorplans }
  }
}

export function setFloorplan (propertyId, floorplan) {
  return {
    type: SET_FLOORPLAN,
    payload: { propertyId, floorplan }
  }
}

export function delFloorplan (propertyId, floorplanId) {
  return {
    type: DELETE_FLOORPLAN,
    payload: { propertyId, floorplanId }
  }
}

export function addUnits (id, units) {
  return {
    type: ADD_UNITS,
    payload: { id, units }
  }
}

export function setUnit (propertyId, unit) {
  return {
    type: SET_UNIT,
    payload: { propertyId, unit }
  }
}

export function delUnit (propertyId, unitId) {
  return {
    type: DELETE_UNIT,
    payload: { propertyId, unitId }
  }
}

export function addTermPrices (id, unitid, termprices) {
  return {
    type: ADD_TERMPRICES,
    payload: { id, unitid, termprices }
  }
}

export function setTermPrice (id, unitid, termprice) {
  return {
    type: SET_TERMPRICE,
    payload: { id, unitid, termprice }
  }
}

export function delTermPrice (propertyId, unitId, termpriceId) {
  return {
    type: DELETE_TERMPRICE,
    payload: { propertyId, unitId, termpriceId }
  }
}

export function setLoading (isLoading) {
  return {
    type: SET_LOADING,
    payload: isLoading
  }
}

export function setErrMsg (errMsg) {
  return {
    type: SET_ERROR_POPUP,
    payload: errMsg
  }
}

export function setInfo (accountInfo) {
  return {
    type: SET_INFO,
    payload: accountInfo
  }
}

export function setActive (activeAccount) {
  return {
    type: SET_ACTIVE,
    payload: activeAccount
  }
}

export function setNetwork (network) {
  return {
    type: SET_NETWORK,
    network
  }
}

export function setFsMgrContract (instance) {
  return {
    type: SET_FSMGRCONTRACT,
    instance
  }
}

export function setEosClient (eosClient) {
  return {
    type: SET_EOSCLIENT,
    eosClient
  }
}

export function setScatter (instance) {
  return {
    type: SET_SCATTER,
    instance
  }
}

export function addProperties (properties) {
  return {
    type: ADD_PROPERTIES,
    properties
  }
}

export function setProperty (property) {
  return {
    type: SET_PROPERTY,
    property
  }
}
