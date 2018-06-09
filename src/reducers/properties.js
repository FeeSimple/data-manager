import {
  ADD_PROPERTIES,
  ADD_PROPERTY,
  EDIT_PROPERTY,
  REMOVE_PROPERTY
} from '../actions/types'

const initialState = {
  0:{
    name: 'St Paul',
    address1: 'Lehigh Street, 145',
    address2: '',
    city: 'Emmaus',
    region: 'LeHigh Valley',
    postal_code:'58016',
    unit_count:1
  },
  1:{
    name: 'Lincoln Building',
    address1: 'Herriman St, 545',
    address2: '5th Block',
    city: 'Salt Lake City',
    region: 'Park City',
    postal_code:'58086',
    unit_count:7
  },
  2:{
    name: 'John Ferry',
    address1: 'Sandpoint Avenue, 3332',
    address2: '2nd floor',
    city: 'Idaho City',
    region: 'Boise County',
    postal_code:'58543',
    unit_count:4
  },
  3:{
    name: 'St Paul',
    address1: 'Lehigh Street, 145',
    address2: '',
    city: 'Emmaus',
    region: 'LeHigh Valley',
    postal_code:'58016',
    unit_count:1
  },
  4:{
    name: 'Lincoln Building',
    address1: 'Herriman St, 545',
    address2: '5th Block',
    city: 'Salt Lake City',
    region: 'Park City',
    postal_code:'58086',
    unit_count:7
  },
  5:{
    name: 'John Ferry',
    address1: 'Sandpoint Avenue, 3332',
    address2: '2nd floor',
    city: 'Idaho City',
    region: 'Boise County',
    postal_code:'58543',
    unit_count:4
  }
}

export function properties (state = initialState, action) {
  switch (action.type) {
    case ADD_PROPERTIES: {
      return state
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
