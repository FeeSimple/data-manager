import React, { Component } from 'react'
import { MdChevronRight } from 'react-icons/lib/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { idFromPath } from '../utils/index'
import { addProperties } from '../actions'
import {
    ListGroup,
    ListGroupItem,
    Col,
    Row
} from 'reactstrap'

class PropertyListContainer extends Component {

  propertyClick = (e,id) => {
    e.preventDefault()
    this.props.history.push('/'+id);
  }  

  render() {

    const { properties } = this.props
    const { pathname } = this.props.location
    const selectedId = idFromPath(pathname)    

    return (
      <PropertyList
        selectedId={selectedId}
        properties={properties}
        onPropertySelect={this.propertyClick} />
    )
  }
}

const PropertyList = ({selectedId,properties,onPropertySelect}) => (
  properties && Object.keys(properties).length > 0
   ? <ListGroup>
      {
        Object.keys(properties).map(id => {
          const property = properties[id]
          return (
            <ListGroupItem
              key={id}
              onClick={(e) => onPropertySelect(e,id)}
              active={selectedId===id?true:false}
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
          )
        })
      }
    </ListGroup>
  : <div className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <h4>No data</h4>
      </Row>
    </div>
)

function mapStateToProps({ properties, scatter, eosjs }){
  return { properties, scatter, eosjs }
}

export default withRouter(connect(
  mapStateToProps,
  { addProperties },
)(PropertyListContainer))
