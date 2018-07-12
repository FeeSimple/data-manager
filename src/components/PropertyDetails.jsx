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

class PropertyDetails extends Component {
  state = {
    mode: '',
    loading: false,
    property: {
      name: '',
      address_1: '',
      address_2: '',
      city: '',
      region: '',
      postal_code: '',
      unit_count: 0
    },
  }

  edit = (e) => {
    this.setState({mode: EDITING})
  }

  cancel = (e) => {
    // TODO: reset fields
    this.setState({mode: READING})
  }

  save = (e) => {
    console.info('Save changes')
  }

  create = (e) => {
    e.preventDefault()
    this.setState({ loading: true })

    const eosClient = this.props.eosClient.instance
    const { property } = this.state    
    eosClient
      .transaction('addproperty', {
        author: 'fsmgrcode333',
        ...property
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err);
      })
  }

  handleChange(event) {    
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState(prevState => {
      let state = {
        ...prevState
      }
      state.property = {
        ...prevState.property,
        [name]: value
      }
      return state
    })
  }

  componentDidMount(){
    const { isCreating } = this.props
    isCreating
      ? this.setState({ mode: CREATING })
      : this.setState({ mode: READING })

    const { pathname } = this.props.location
    const { properties } = this.props
    const selectedId = idFromPath(pathname)
    let property = properties[selectedId]
      ? properties[selectedId]
      : newProperty()
    
    this.setState({ property })
  }

  render() {    
    return (
      <div>
        <h4>Property Details</h4>
        <hr />
        <Form>
          <FormGroup row>
            <Label for="name" sm={2}>Name</Label>
            <Col sm={10}>
              <Input
                name="name" 
                id="name"
                value={this.state.property.name} 
                onChange={(e) => this.handleChange(e)}
                disabled={this.state.mode===READING}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address_1" sm={2}>Address 1</Label>
            <Col sm={10}>
              <Input 
                id="address_1" 
                name="address_1"
                type="textarea" 
                onChange={(e) => this.handleChange(e)}
                value={this.state.property.address_1}            
                disabled={this.state.mode===READING} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address_2" sm={2}>Address 2</Label>
            <Col sm={10}>
              <Input 
                id="address_2" 
                name="address_2"
                type="textarea" 
                value={this.state.property.address_2}
                onChange={(e) => this.handleChange(e)}
                disabled={this.state.mode===READING} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={2}>City</Label>
            <Col sm={10}>
              <Input 
                id="city" 
                name="city" 
                disabled={this.state.mode===READING}
                onChange={(e) => this.handleChange(e)}
                value={this.state.property.city}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="region" sm={2}>Region</Label>
            <Col sm={10}>
              <Input 
                id="region"
                name="region"
                disabled={this.state.mode===READING}
                onChange={(e) => this.handleChange(e)}
                value={this.state.property.region}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="postal_code" sm={2}>Postal Code</Label>
            <Col sm={10}>
              <Input 
                id="postal_code" 
                name="postal_code" 
                disabled={this.state.mode===READING}
                onChange={(e) => this.handleChange(e)}
                value={this.state.property.postal_code}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="unit_count" sm={2}>Unit Count</Label>
            <Col sm={10}>
              <Input 
                id="unit_count" 
                type="number" 
                name="unit_count"
                onChange={(e) => this.handleChange(e)}
                disabled={this.state.mode===READING} 
                value={this.state.property.unit_count}/>
            </Col>
          </FormGroup>
          <Button color="primary" hidden={this.state.mode!==READING}
            onClick={this.edit}>
            Edit
          </Button>
          <Button color="primary" hidden={this.state.mode!==EDITING}
            onClick={this.save} style={{marginRight:'0.5em'}}>
            Save
          </Button>
          <Button color="primary" hidden={this.state.mode!==CREATING}
            onClick={this.create} style={{marginRight:'0.5em'}}>
            Create
          </Button>
          <Button outline hidden={this.state.mode!==EDITING}
            onClick={this.cancel}>
            Cancel
          </Button>
        </Form>
      </div>
    )
  }
}

const newProperty = () => ({
  name: '',
  address_1: '',
  address_2: '',
  city: '',
  region: '',
  postal_code: '',
  unit_count: 0
})

function mapStateToProps({ properties, eosClient }){
  return { properties, eosClient }
}

export default withRouter(connect(
  mapStateToProps,
  { addProperty, editProperty, removeProperty }
)(PropertyDetails))
