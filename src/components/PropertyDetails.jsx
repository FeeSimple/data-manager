import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button
} from 'reactstrap'

class PropertyDetails extends Component {
  render() {
    return (
      <div>
        <h1>Property Details</h1>
        <hr />
        <Form>
          <FormGroup row>
            <Label for="propertyName" sm={2}>Name</Label>
            <Col sm={10}>
             <Input name="propertyName" id="propertyName" disabled/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address1" sm={2}>Address 1</Label>
            <Col sm={10}>
              <Input type="textarea" name="address1" id="address1" disabled />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address1" sm={2}>Address 2</Label>
            <Col sm={10}>
              <Input type="textarea" name="address2" id="address2" disabled />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={2}>City</Label>
            <Col sm={10}>
             <Input name="city" id="city" disabled />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="region" sm={2}>Region</Label>
            <Col sm={10}>
             <Input name="region" id="region" disabled/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="postalCode" sm={2}>Postal Code</Label>
            <Col sm={10}>
             <Input name="postalCode" id="postalCode" disabled />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="unitCount" sm={2}>Unit Count</Label>
            <Col sm={10}>
             <Input type="number" name="unitCount" id="unitCount" disabled/>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Button color="primary">Edit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default PropertyDetails
