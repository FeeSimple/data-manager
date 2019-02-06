import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  setProperty,
  addProperties,
  setLoading,
  delProperty
} from '../../../actions'
import PropertyDetails, { READING, EDITING, CREATING } from './PropertyDetails'
import { FSMGRCONTRACT, PROPERTY } from '../../../utils/consts'
import Confirm from '../../layout/Confirm'

class PropertyDetailsContainer extends Component {
  state = {
    mode: READING,
    prevProperty: {},
    property: newProperty(),
    showConfirm: false,
    propertyId: null
  }

  edit = (e, property) => {
    e.preventDefault()

    this.setState({
      mode: EDITING,
      property,
      prevProperty: {
        ...property
      }
    })
  }

  save = async e => {
    e.preventDefault()

    const { property } = this.state
    const { contracts, accountData, setLoading, setProperty } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)
    await fsmgrcontract.modproperty(
      accountData.active,
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

    setProperty(property)
    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const {
      addProperties,
      contracts,
      eosClient,
      accountData,
      setLoading,
      history
    } = this.props
    const { property } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }
    this.setState({ mode: READING })

    setLoading(true)

    await fsmgrcontract.addproperty(
      accountData.active,
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
      FSMGRCONTRACT,
      accountData.active,
      PROPERTY
    )
    addProperties(rows)
    setLoading(false)
    history.push('/')
  }

  handleChange (event) {
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

  deleteOne = async () => {
    const propertyId = this.state.propertyId

    const {
      addProperties,
      contracts,
      eosClient,
      accountData,
      setLoading,
      history
    } = this.props

    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }
    this.setState({ mode: READING })

    setLoading(true)

    try {
      await fsmgrcontract.delproperty(accountData.active, propertyId, options)
      console.log('fsmgrcontract.delproperty - propertyId:', propertyId)
    } catch (err) {
      console.log('fsmgrcontract.delproperty - error:', err)
    }

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      PROPERTY
    )
    addProperties(rows)
    setLoading(false)
    history.push('/')
  }

  handleToggleConfirm = async (propertyId) => {
    const { showConfirm } = this.state
    this.setState({ showConfirm: !showConfirm })
    
    if (propertyId !== -1) {
      this.setState({ 
        propertyId: propertyId,
      })

      console.log(`handleToggleConfirm - propertyId: ${propertyId}`)
    }
  }

  render () {
    const { isCreating, properties, id } = this.props
    const mode = isCreating ? CREATING : this.state.mode
    let property =
      mode === EDITING || mode === CREATING
        ? this.state.property
        : properties[id]
    return (
      <div>
        {typeof property === 'undefined' && (
          <h1 className='text-center my-5 py-5'>404 - Property not found</h1>
        )}
        {typeof property !== 'undefined' && (
          <div>
            <PropertyDetails
              property={property}
              mode={mode}
              onEditClick={this.edit}
              onSaveClick={this.save}
              onCreateClick={this.create}
              onCancelClick={this.cancel}
              onChange={e => this.handleChange(e)}
              handleToggle={this.handleToggleConfirm}
            />
            <Confirm
              isOpen={this.state.showConfirm}
              handleToggle={this.handleToggleConfirm}
              onDelete={this.deleteOne}
              text='this property and its associated units/floor-plans?'
            />
          </div>
        )}
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

function mapStateToProps ({
  properties,
  eosClient,
  scatter,
  contracts,
  accountData
}) {
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(
  connect(mapStateToProps, {
    setProperty,
    addProperties,
    delProperty,
    setLoading
  })(PropertyDetailsContainer)
)
