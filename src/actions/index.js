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
  SET_FLOORPLAN,
  ADD_FLOORPLANS,
} from '../actions/types'

export function addFloorplans (floorplans) {
  return {
    type: ADD_FLOORPLANS,
    payload: { floorplans }
  }
}

export function setFloorplan (propertyId, floorplan) {
  return {
    type: SET_FLOORPLAN,
    payload: { propertyId, floorplan }
  }
}

export function setLoading (isLoading) {
  return {
    type: SET_LOADING,
    payload: isLoading
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
