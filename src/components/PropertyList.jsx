import React, { Component } from 'react'
import { MdChevronRight } from 'react-icons/lib/md'
import {withRouter} from 'react-router-dom'
import {idFromPath} from '../utils/index'
import {
    ListGroup,
    ListGroupItem,
    Col,
    Row
} from 'reactstrap'

class PropertyListContainer extends Component {

  propertyClick = (e,property) => {
    e.preventDefault()
    this.props.history.push('/properties/'+property.id);
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
    const {pathname} = this.props.location
    const id = Number(idFromPath(pathname))

    return (
      <PropertyList
        id={id}
        properties={properties}
        onPropertySelect={this.propertyClick} />
    )
  }
}

const PropertyList = ({id,properties,onPropertySelect}) => (
  <ListGroup>
    {properties.map((property) => (
      <ListGroupItem
        key={property.id}
        onClick={(e) => onPropertySelect(e,property)}
        active={id===property.id?true:false}
        >
        <Row >
          <Col>
            <h5>{property.name}</h5>
            <p>{property.city}</p>
          </Col>
          <Col xs="3" md="3" className="text-right">
            <MdChevronRight size={34}/>
          </Col>
        </Row>
      </ListGroupItem>
    ))}
  </ListGroup>
)

export default withRouter(PropertyListContainer)
