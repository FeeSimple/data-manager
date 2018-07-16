import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addProperty, removeProperty, editProperty, addProperties } from '../actions'
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
    mode: READING,
    loading: false,
    prevProperty: {},
    property: newProperty()
  }

  edit = (e,property) => {    
    this.setState({
      mode: EDITING,
      property,
      prevProperty: {
        ...property
      }
    })
  }

  cancel = (e) => {
    const { prevProperty } = this.state
    this.setState({
      mode: READING,
      property: {
        ...prevProperty
      },
      prevProperty: {}
    })
  }

  save = (e) => {    
    e.preventDefault()
    this.setState({ loading: true })

    const eosClient = this.props.eosClient.instance
    const { property } = this.state
    const { history } = this.props

    eosClient
      .transaction('modproperty', {
        owner: 'fsmgrcode111',
        ...property
      })
      .then(res => {
        console.log(res)
        addProperty(property)
        history.push('/'+property.id)
        this.setState({ 
          mode: READING,
          loading: false
        })
      })
      .catch(err => {
        this.setState({ 
          mode: READING,
          loading: false
        })
        console.log(err)
    })
  }

  create = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { addProperties, history } = this.props

    const eosClient = this.props.eosClient.instance
    const { property } = this.state
    eosClient
      .transaction('addproperty', {
        owner: 'fsmgrcode111',
        ...property
      })
      .then(res => {
        console.log(res)        
        return eosClient.getTableRows('property')          
      })
      .then(data => {
        addProperties(data.rows)
        history.push('/')
        this.setState({ loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
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

  render() {
    const { isCreating, properties, id } = this.props    
    const mode = isCreating ? CREATING : this.state.mode    
    let property = mode === EDITING || mode === CREATING  ? this.state.property : properties[id]
    return (
      <div>
        {typeof property === 'undefined' && <h1>404 - Property not found</h1>}
        {isCreating
          ? typeof property !== 'undefined' && 
            <PropertyDetails
              property={property}
              mode={mode}
              onEditClick={this.edit}
              onSaveClick={this.save}
              onCreateClick={this.create}
              onCancelClick={this.cancel}
              onChange={(e) => this.handleChange(e)}
            />
          : typeof property !== 'undefined' && 
            <PropertyDetails
              property={property}
              mode={mode}
              onEditClick={this.edit}
              onSaveClick={this.save}
              onCreateClick={this.create}
              onCancelClick={this.cancel}
              onChange={(e) => this.handleChange(e)}
            />
        }
      </div>
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
  onChange
}) => (
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
            value={property.name} 
            onChange={onChange}
            disabled={mode===READING}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address_1" sm={2}>Address 1</Label>
        <Col sm={10}>
          <Input 
            id="address_1" 
            name="address_1"
            type="textarea" 
            onChange={onChange}
            value={property.address_1}            
            disabled={mode===READING} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address_2" sm={2}>Address 2</Label>
        <Col sm={10}>
          <Input 
            id="address_2" 
            name="address_2"
            type="textarea" 
            value={property.address_2}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            value={property.region}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="postal_code" sm={2}>Postal Code</Label>
        <Col sm={10}>
          <Input 
            id="postal_code" 
            name="postal_code" 
            disabled={mode===READING}
            onChange={onChange}
            value={property.postal_code}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="unit_count" sm={2}>Unit Count</Label>
        <Col sm={10}>
          <Input 
            id="unit_count" 
            type="number" 
            name="unit_count"
            onChange={onChange}
            disabled={mode===READING} 
            value={property.unit_count}/>
        </Col>
      </FormGroup>
      <Button color="primary" hidden={mode!==READING}
        onClick={(e) => onEditClick(e,property)}>
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
  { addProperty, editProperty, removeProperty, addProperties }
)(PropertyDetailsContainer))
