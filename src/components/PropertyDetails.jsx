import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button
} from 'reactstrap'

class PropertyDetailsContainer extends Component {
  state = {
    isEditing: false
  }

  toggleEdit = (e) => {
    e.preventDefault()

    const {isEditing} = this.state
    this.setState({isEditing: !isEditing})
  }

  cancel = (e) => {
    this.toggleEdit(e)
    console.info('Cancel edit')
  }

  save = (e) => {
    console.info('Save changes')
  }

  render() {
    const { isEditing } = this.state

    const property = {
      id:0,
      name: 'St Paul',
      address1: 'Lehigh Street, 145',
      address2: '',
      city: 'Emmaus',
      region: 'LeHigh Valley',
      postal_code:'58016',
      unit_count:1
    }

    return (
      <PropertyDetails
        property={property}
        isEditing={isEditing}
        onEditClick={this.toggleEdit}
        onSaveClick={this.save}
        onCancelClick={this.cancel}/>
    )
  }
}

const PropertyDetails = ({
  property,
  isEditing,
  onEditClick,
  onCancelClick,
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
            value={property.name} disabled={!isEditing}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address1" sm={2}>Address 1</Label>
        <Col sm={10}>
          <Input type="textarea" name="address1"
            value={property.address1}
            id="address1" disabled={!isEditing} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address1" sm={2}>Address 2</Label>
        <Col sm={10}>
          <Input type="textarea" name="address2"
            value={property.address2}
            id="address2" disabled={!isEditing} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="city" sm={2}>City</Label>
        <Col sm={10}>
         <Input name="city" id="city" disabled={!isEditing}
           value={property.city}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="region" sm={2}>Region</Label>
        <Col sm={10}>
         <Input name="region" id="region" disabled={!isEditing}
          value={property.region}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="postalCode" sm={2}>Postal Code</Label>
        <Col sm={10}>
         <Input name="postalCode" id="postalCode" disabled={!isEditing}
          value={property.postal_code}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="unitCount" sm={2}>Unit Count</Label>
        <Col sm={10}>
         <Input type="number" name="unitCount"
          id="unitCount" disabled={!isEditing} value={property.unit_count}/>
        </Col>
      </FormGroup>
      <Button color="primary" hidden={isEditing}
        onClick={(e) => onEditClick(e)}>
        Edit
      </Button>
      <Button color="primary" hidden={!isEditing}
        onClick={(e) => onSaveClick(e)} style={{marginRight:'0.5em'}}>
        Save
      </Button>
      <Button outline hidden={!isEditing}
        onClick={(e) => onCancelClick(e)}>
        Cancel
      </Button>
    </Form>
  </div>
)



export default PropertyDetailsContainer
