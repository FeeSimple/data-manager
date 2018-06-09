import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { idFromPath } from '../utils/index'
import { addProperty, removeProperty, editProperty } from '../actions'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button
} from 'reactstrap'

// View Modes
const READING = 'reading'
const EDITING = 'editing'
const CREATING = 'creating'

class PropertyDetailsContainer extends Component {
  state = {
    mode: ''
  }

  newProperty = () => ({
    name: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postal_code: '',
    unit_count: 0
  })

  edit = (e) => {
    this.setState({mode: EDITING})
  }

  cancel = (e) => {
    this.setState({mode: READING})
  }

  save = (e) => {
    console.info('Save changes')
  }

  create = (e,property) => {
    console.info('Create property')
  }

  componentDidMount(){
    const { isCreating } = this.props
    isCreating
      ? this.setState({ mode: CREATING })
      : this.setState({ mode: READING })
  }

  render() {
    const { mode } = this.state
    const { pathname } = this.props.location
    const { properties } = this.props
    const selectedId = idFromPath(pathname)

    let property = properties[selectedId]
      ? properties[selectedId]
      : this.newProperty()

    return (
      <PropertyDetails
        property={property}
        mode={mode}
        onEditClick={this.edit}
        onSaveClick={this.save}
        onCreateClick={this.create}
        onCancelClick={this.cancel}/>
    )
  }
}

const PropertyDetails = ({
  property,
  mode,
  onEditClick,
  onCancelClick,
  onCreateClick,
  onSaveClick
}) => (
  <div>
    <h4>Property Details</h4>
    <hr />
    <Form>
      <FormGroup row>
        <Label for="propertyName" sm={2}>Name</Label>
        <Col sm={10}>
         <Input name="propertyName" id="propertyName"
            value={property.name} disabled={mode===READING}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address1" sm={2}>Address 1</Label>
        <Col sm={10}>
          <Input type="textarea" name="address1"
            value={property.address1}
            id="address1" disabled={mode===READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address1" sm={2}>Address 2</Label>
        <Col sm={10}>
          <Input type="textarea" name="address2"
            value={property.address2}
            id="address2" disabled={mode===READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="city" sm={2}>City</Label>
        <Col sm={10}>
         <Input name="city" id="city" disabled={mode===READING}
           value={property.city}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="region" sm={2}>Region</Label>
        <Col sm={10}>
         <Input name="region" id="region" disabled={mode===READING}
          value={property.region}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="postalCode" sm={2}>Postal Code</Label>
        <Col sm={10}>
         <Input name="postalCode" id="postalCode" disabled={mode===READING}
          value={property.postal_code}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="unitCount" sm={2}>Unit Count</Label>
        <Col sm={10}>
         <Input type="number" name="unitCount"
          id="unitCount" disabled={mode===READING} value={property.unit_count}/>
        </Col>
      </FormGroup>
      <Button color="primary" hidden={mode!==READING}
        onClick={(e) => onEditClick(e)}>
        Edit
      </Button>
      <Button color="primary" hidden={mode!==EDITING}
        onClick={(e) => onSaveClick(e)} style={{marginRight:'0.5em'}}>
        Save
      </Button>
      <Button color="primary" hidden={mode!==CREATING}
        onClick={(e) => onCreateClick(e,property)} style={{marginRight:'0.5em'}}>
        Create
      </Button>
      <Button outline hidden={mode!==EDITING}
        onClick={(e) => onCancelClick(e)}>
        Cancel
      </Button>
    </Form>
  </div>
)

function mapStateToProps({properties}){
  return {properties}
}

export default withRouter(connect(
  mapStateToProps,
  {addProperty,editProperty,removeProperty}
)(PropertyDetailsContainer))
