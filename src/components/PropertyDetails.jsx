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
    const {isEditing} = this.state

    return (
      <div>
        <h1>Property Details</h1>
        <hr />
        <Form>
          <FormGroup row>
            <Label for="propertyName" sm={2}>Name</Label>
            <Col sm={10}>
             <Input name="propertyName" id="propertyName" disabled={!isEditing}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address1" sm={2}>Address 1</Label>
            <Col sm={10}>
              <Input type="textarea" name="address1"
                id="address1" disabled={!isEditing} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address1" sm={2}>Address 2</Label>
            <Col sm={10}>
              <Input type="textarea" name="address2"
                id="address2" disabled={!isEditing} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={2}>City</Label>
            <Col sm={10}>
             <Input name="city" id="city" disabled={!isEditing} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="region" sm={2}>Region</Label>
            <Col sm={10}>
             <Input name="region" id="region" disabled={!isEditing}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="postalCode" sm={2}>Postal Code</Label>
            <Col sm={10}>
             <Input name="postalCode" id="postalCode" disabled={!isEditing} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="unitCount" sm={2}>Unit Count</Label>
            <Col sm={10}>
             <Input type="number" name="unitCount"
              id="unitCount" disabled={!isEditing}/>
            </Col>
          </FormGroup>
          <Button color="primary" hidden={isEditing}
            onClick={(e) => this.toggleEdit(e)}>
            Edit
          </Button>
          <Button color="primary" hidden={!isEditing}
            onClick={(e) => this.save(e)} style={{'margin-right':'0.5em'}}>
            Save
          </Button>
          <Button outline color="primary" hidden={!isEditing}
            onClick={(e) => this.cancel(e)}>
            Cancel
          </Button>
        </Form>
      </div>
    )
  }
}

export default PropertyDetails
