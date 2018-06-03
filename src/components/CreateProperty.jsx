import React, { Component } from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from 'reactstrap'

class CreateProperty extends Component {
  render () {
    return (
      <div>
        <h1>Create Property</h1>
        <hr />
        <Form>
          <FormGroup row>
            <Label for='propertyName' sm={2}>Name</Label>
            <Col sm={10}>
              <Input name='propertyName' id='propertyName' placeholder='Palace Center' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='address1' sm={2}>Address 1</Label>
            <Col sm={10}>
              <Input type='textarea' name='address1' id='address1' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='address2' sm={2}>Address 2</Label>
            <Col sm={10}>
              <Input type='textarea' name='address2' id='address2' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='city' sm={2}>City</Label>
            <Col sm={10}>
              <Input name='city' id='city' placeholder='San Jose' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='region' sm={2}>Region</Label>
            <Col sm={10}>
              <Input name='region' id='region' placeholder='San Francisco Bay Area' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='postalCode' sm={2}>Postal Code</Label>
            <Col sm={10}>
              <Input name='postalCode' id='postalCode' placeholder='95101' />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='unitCount' sm={2}>Unit Count</Label>
            <Col sm={10}>
              <Input type='number' name='unitCount' id='unitCount' placeholder='7' />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Button color='primary'>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default CreateProperty
