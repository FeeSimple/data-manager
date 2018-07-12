import {
  ADD_PROPERTIES,
  ADD_PROPERTY,
  EDIT_PROPERTY,
  REMOVE_PROPERTY
} from '../actions/types'

const initialState = {
  0:{
    name: 'St Paul',
    address_1: 'Lehigh Street, 145',
    address_2: '',
    city: 'Emmaus',
    region: 'LeHigh Valley',
    postal_code:'58016',
    unit_count:1
  },
  1:{
    name: 'Lincoln Building',
    address_1: 'Herriman St, 545',
    address_2: '5th Block',
    city: 'Salt Lake City',
    region: 'Park City',
    postal_code:'58086',
    unit_count:7
  },
  2:{
    name: 'John Ferry',
    address_1: 'Sandpoint Avenue, 3332',
    address_2: '2nd floor',
    city: 'Idaho City',
    region: 'Boise County',
    postal_code:'58543',
    unit_count:4
  },
  3:{
    name: 'St Paul',
    address_1: 'Lehigh Street, 145',
    address_2: '',
    city: 'Emmaus',
    region: 'LeHigh Valley',
    postal_code:'58016',
    unit_count:1
  },
  4:{
    name: 'Lincoln Building',
    address_1: 'Herriman St, 545',
    address_2: '5th Block',
    city: 'Salt Lake City',
    region: 'Park City',
    postal_code:'58086',
    unit_count:7
  },
  5:{
    name: 'John Ferry',
    address_1: 'Sandpoint Avenue, 3332',
    address_2: '2nd floor',
    city: 'Idaho City',
    region: 'Boise County',
    postal_code:'58543',
    unit_count:4
  }
}

export function properties (state = {}, action) {
  const { properties } = action
  switch (action.type) {
    case ADD_PROPERTIES: {
      let newState = {
        ...state
      }
      properties.map(p => {
        newState[p.id] = p
      })
      return newState
    }
    case ADD_PROPERTY: {
      return state
    }
    case EDIT_PROPERTY: {
      return state
    }
    case REMOVE_PROPERTY: {
      return state
    }
    default:
      return state
  }
}
