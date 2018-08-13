import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addProperty, removeProperty, editProperty, addProperties } from '../actions'
import PropertyDetails, { READING, EDITING, CREATING } from './PropertyDetails'
import { PROPERTY } from '../utils/tables'
import { getAccountFrom } from '../utils'

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

  save = async (e) => {    
    e.preventDefault()
    this.setState({ loading: true })

    const { property } = this.state
    const { contracts } = this.props
    const fsmgrcontract = contracts[process.env.REACT_APP_FSMGR_ACC_NAME]
    const scatter = this.props.scatter.instance
    const { network } = this.props.scatter

    const account = await getAccountFrom(scatter,network)
    const options = {
      authorization: `${account.name}@${account.authority}`,
      broadcast: true,
      sign: true
    }

    await fsmgrcontract.modproperty(
      account.name,
      property.id,
      property.name,
      property.address_1,
      property.address_2,
      property.city,
      property.region,
      property.postal_code,
      property.unit_count,
      options
    )
        
    window.location.reload()
  }

  create = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { addProperties, contracts, network } = this.props
    const scatter = this.props.scatter.instance
    const eosClient = this.props.eosClient.instance
    const { property } = this.state
    const fsmgrcontract = contracts[process.env.REACT_APP_FSMGR_ACC_NAME]
    
    const account = await getAccountFrom(scatter,network)
    const options = {
      authorization: `${account.name}@${account.authority}`,
      broadcast: true,
      sign: true
    }

    await fsmgrcontract.addproperty(
      account.name,
      property.name,
      property.address_1,
      property.address_2,
      property.city,
      property.region,
      property.postal_code,
      property.unit_count,
      options
    )

    const { rows } = await eosClient.getTableRows(
      true,
      process.env.REACT_APP_FSMGR_ACC_NAME,
      account.name,
      PROPERTY
    )
    
    addProperties(rows)
    this.setState({ mode: READING, loading: false })
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

const newProperty = () => ({
  name: '',
  address_1: '',
  address_2: '',
  city: '',
  region: '',
  postal_code: '',
  unit_count: 0
})

function mapStateToProps({ properties, eosClient, scatter, contracts }){
  return { properties, eosClient, scatter, contracts }
}

export default withRouter(connect(
  mapStateToProps,
  { addProperty, editProperty, removeProperty, addProperties }
)(PropertyDetailsContainer))
