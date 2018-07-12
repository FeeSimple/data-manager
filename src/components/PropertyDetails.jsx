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
    address_1: '',
    address_2: '',
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

  onChangePlaceHolder = (e) => {
    console.info('onChangePlaceHolder')
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
        onCancelClick={this.cancel}
        onChangePlaceHolder={this.onChangePlaceHolder}/>
    )
  }
}

const PropertyDetails = ({
  property,
  mode,
  onEditClick,
  onCancelClick,
  onCreateClick,
  onSaveClick,
  onChangePlaceHolder
}) => (
  <div>
    <h4>Property Details</h4>
    <hr />
    <Form>
      <FormGroup row>
        <Label for="propertyName" sm={2}>Name</Label>
        <Col sm={10}>
          <Input
            name="propertyName" 
            id="propertyName"
            value={property.name} 
            onChange={onChangePlaceHolder}
            disabled={mode===READING}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address1" sm={2}>Address 1</Label>
        <Col sm={10}>
          <Input 
            id="address1" 
            name="address1"
            type="textarea" 
            onChange={onChangePlaceHolder}
            value={property.address_1}            
            disabled={mode===READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address1" sm={2}>Address 2</Label>
        <Col sm={10}>
          <Input 
            id="address2" 
            name="address2"
            type="textarea" 
            value={property.address_2}
            onChange={onChangePlaceHolder}
            disabled={mode===READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="city" sm={2}>City</Label>
        <Col sm={10}>
          <Input 
            id="city" 
            name="city" 
            disabled={mode===READING}
            onChange={onChangePlaceHolder}
            value={property.city}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="region" sm={2}>Region</Label>
        <Col sm={10}>
          <Input 
            id="region"
            name="region"
            disabled={mode===READING}
            onChange={onChangePlaceHolder}
            value={property.region}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="postalCode" sm={2}>Postal Code</Label>
        <Col sm={10}>
          <Input 
            id="postalCode" 
            name="postalCode" 
            disabled={mode===READING}
            onChange={onChangePlaceHolder}
            value={property.postal_code}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="unitCount" sm={2}>Unit Count</Label>
        <Col sm={10}>
          <Input 
            id="unitCount" 
            type="number" 
            name="unitCount"
            onChange={onChangePlaceHolder}
            disabled={mode===READING} 
            value={property.unit_count}/>
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
  { addProperty, editProperty, removeProperty }
)(PropertyDetailsContainer))
