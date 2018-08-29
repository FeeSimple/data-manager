import {
  ADD_PROPERTIES,
  ADD_PROPERTY,
  EDIT_PROPERTY,
  REMOVE_PROPERTY,
  SET_SCATTER,
  SET_EOSCLIENT,
  SET_FSMGRCONTRACT,
  SET_NETWORK,
  SET_ACTIVE,
  SET_INFO
} from '../actions/types'

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

export function addProperty (property) {
  console.info('creating action')
  return {
    type: ADD_PROPERTY,
    property
  }
}

export function editProperty (property) {
  return {
    type: EDIT_PROPERTY,
    property
  }
}

export function removeProperty (id) {
  return {
    type: REMOVE_PROPERTY,
    id
  }
}
