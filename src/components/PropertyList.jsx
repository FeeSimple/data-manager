import React, { Component } from 'react'
import {
  MdChevronRight,
  MdKeyboardArrowRight
} from 'react-icons/lib/md'
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Col,
    Row
} from 'reactstrap'

class PropertyList extends Component {

  state = {
    active:undefined
  }

  propertyClick = (e,property) => {
    e.preventDefault()
    this.setState({active:property.id})
  }

  render() {
    const properties = [
      {
        id:0,
        name: 'St Paul',
        address1: 'Lehigh Street, 145',
        address2: '',
        city: 'Emmaus',
        region: 'LeHigh Valley',
        postal_code:'58016',
        unit_count:1
      },
      {
        id:1,
        name: 'Lincoln Building',
        address1: 'Herriman St, 545',
        address2: '5th Block',
        city: 'Salt Lake City',
        region: 'Park City',
        postal_code:'58086',
        unit_count:7
      },
      {
        id:2,
        name: 'John Ferry',
        address1: 'Sandpoint Avenue, 3332',
        address2: '2nd floor',
        city: 'Idaho City',
        region: 'Boise County',
        postal_code:'58543',
        unit_count:4
      },
      {
        id:3,
        name: 'St Paul',
        address1: 'Lehigh Street, 145',
        address2: '',
        city: 'Emmaus',
        region: 'LeHigh Valley',
        postal_code:'58016',
        unit_count:1
      },
      {
        id:4,
        name: 'Lincoln Building',
        address1: 'Herriman St, 545',
        address2: '5th Block',
        city: 'Salt Lake City',
        region: 'Park City',
        postal_code:'58086',
        unit_count:7
      },
      {
        id:5,
        name: 'John Ferry',
        address1: 'Sandpoint Avenue, 3332',
        address2: '2nd floor',
        city: 'Idaho City',
        region: 'Boise County',
        postal_code:'58543',
        unit_count:4
      },
    ]
    const {active} = this.state

    return (
      <div>
        <h1>Property List</h1>
        <hr />
        <ListGroup>
          {properties.map((property) => (
            <ListGroupItem
              key={property.id}
              onClick={(e) => this.propertyClick(e,property)}
              active={active===property.id?true:false}
              >
              <Row >
                <Col>
                  <h3>{property.name}</h3>
                  {property.city} | {property.region}
                </Col>
                <Col xs="3" md="3" className="text-right">
                  <MdChevronRight size={44}/>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default PropertyList
