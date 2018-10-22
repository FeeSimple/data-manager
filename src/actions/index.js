import {
  ADD_PROPERTIES,
  SET_PROPERTY,
  SET_SCATTER,
  SET_EOSCLIENT,
  SET_FSMGRCONTRACT,
  SET_NETWORK,
  SET_ACTIVE,
  SET_INFO,
  SET_LOADING
} from '../actions/types'

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

export function beautifyCpu(cpuAmount) {
  let cpu = cpuAmount;

  let cnt=0;
  while (cnt < 2 && cpu >= 1000) {
    cpu = cpu/1000;
    cnt++;
  }
  cpu = new Intl.NumberFormat().format(cpu);
  if (cnt == 0) {
    cpu = cpu.toString() + " µs";
  }
  else if (cnt == 1) {
    cpu = cpu.toString() + " ms";
  }
  else if (cnt == 2) {
    cpu = cpu.toString() + " s";
  }

  return cpu;
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
    resourceStr += '(' + beautifyCpu(resourceAvailable);
  }
  else {
    resourceStr += '(' + beautifyRam(resourceAvailable);
  }
  if (cpu) {
    resourceStr += ' / ' + beautifyCpu(resourceAvailable);
  }
  else {
    resourceStr += ' / ' + beautifyRam(resource.max);
  }
  resourceStr += ')';
  return resourceStr;
}
