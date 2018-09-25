import React from 'react'
import {
  Form,
  FormGroup,
  Label,
  FormControl,
  Col,
  Button
} from 'react-bootstrap'

export const READING = 'reading'
export const EDITING = 'editing'
export const CREATING = 'creating'

const PropertyDetails = ({
  property,
  mode,
  onEditClick,
  onCancelClick,
  onCreateClick,
  onSaveClick,
  onChange
}) => (
  <div>
    <h4>Property Details</h4>
    <hr />
    <Form>
      <FormGroup row>
        <Label for='name' sm={2}>Name</Label>
        <Col sm={10}>
          <FormControl
            name='name'
            id='name'
            value={property.name}
            onChange={onChange}
            disabled={mode === READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='address_1' sm={2}>Address 1</Label>
        <Col sm={10}>
          <FormControl
            id='address_1'
            name='address_1'
            type='textarea'
            onChange={onChange}
            value={property.address_1}
            disabled={mode === READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='address_2' sm={2}>Address 2</Label>
        <Col sm={10}>
          <FormControl
            id='address_2'
            name='address_2'
            type='textarea'
            value={property.address_2}
            onChange={onChange}
            disabled={mode === READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='city' sm={2}>City</Label>
        <Col sm={10}>
          <FormControl
            id='city'
            name='city'
            disabled={mode === READING}
            onChange={onChange}
            value={property.city} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='region' sm={2}>Region</Label>
        <Col sm={10}>
          <FormControl
            id='region'
            name='region'
            disabled={mode === READING}
            onChange={onChange}
            value={property.region} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='postal_code' sm={2}>Postal Code</Label>
        <Col sm={10}>
          <FormControl
            id='postal_code'
            name='postal_code'
            disabled={mode === READING}
            onChange={onChange}
            value={property.postal_code} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='unit_count' sm={2}>Unit Count</Label>
        <Col sm={10}>
          <FormControl
            id='unit_count'
            type='number'
            name='unit_count'
            onChange={onChange}
            disabled={mode === READING}
            value={property.unit_count} />
        </Col>
      </FormGroup>
      <Button color='primary' hidden={mode !== READING}
        onClick={(e) => onEditClick(e, property)}>
          Edit
      </Button>
      <Button color='primary' hidden={mode !== EDITING}
        onClick={(e) => onSaveClick(e)} style={{marginRight: '0.5em'}}>
          Save
      </Button>
      <Button color='primary' hidden={mode !== CREATING}
        onClick={(e) => onCreateClick(e, property)} style={{marginRight: '0.5em'}}>
          Create
      </Button>
      <Button outline hidden={mode !== EDITING}
        onClick={(e) => onCancelClick(e)}>
          Cancel
      </Button>
    </Form>
  </div>
)

export default PropertyDetails
