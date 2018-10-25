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

export function beautifyRam(ram) {
  let cnt=0;
  while (cnt < 3 && ram >= 1024) {
    ram = ram/1024;
    cnt++;
  }
  ram = new Intl.NumberFormat().format(ram);
  if (cnt == 0) {
    ram = ram.toString() + " Byte";
  }
  else if (cnt == 1) {
    ram = ram.toString() + " KB";
  }
  else if (cnt == 2) {
    ram = ram.toString() + " MB";
  }
  else if (cnt == 3) {
    ram = ram.toString() + " GB";
  }

  return ram;
}

// Applicable for RAM and Bandwidth
export function getResourceStr(resource, cpu) {
  let resourceAvailable = resource.max - resource.used
  let resourceStr = new Intl.NumberFormat().format((resourceAvailable/resource.max) * 100).toString();
  resourceStr += ' % ';
  if (cpu) {
    resourceStr += '(' + new Intl.NumberFormat().format(resourceAvailable).toString() + ' µs';
  }
  else {
    resourceStr += '(' + beautifyRam(resourceAvailable);
  }
  if (cpu) {
    resourceStr += ' / ' + new Intl.NumberFormat().format(resource.max).toString() + ' µs';
  }
  else {
    resourceStr += ' / ' + beautifyRam(resource.max);
  }
  resourceStr += ')';
  return resourceStr;
}
