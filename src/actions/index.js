import {
  ADD_PROPERTIES,
  ADD_PROPERTY,
  EDIT_PROPERTY,
  REMOVE_PROPERTY
} from '../actions/types'

export function addProperties (properties) {
  return {
    type: ADD_PROPERTIES,
    properties
  }
}

export function addProperty ({
  name,
  address_1,
  address_2,
  city,
  region,
  postal_code,
  unit_count
}) {
  return {
    type: ADD_PROPERTY,
    name,
    address_1,
    address_2,
    city,
    region,
    postal_code,
    unit_count
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
