import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  setProperty,
  addProperties,
  setLoading,
  delProperty
} from '../../../actions'
import PropertyDetails from './PropertyDetails'
import { FSMGRCONTRACT, PROPERTY } from '../../../utils/consts'
import Confirm from '../../layout/Confirm'
import Alert from '../../layout/Alert'

class PropertyDetailsContainer extends Component {
  state = {
    property: 'undefined',
    showConfirm: false,
    propertyId: null,

    alertShow: false,
    alertContent: [],
    alertHeader: ''
  }

  handleToggleAlert = () => {
    const { alertShow } = this.state
    this.setState({ alertShow: !alertShow })
  }

  validator = property => {
    let alertContent = []
    if (!property.name || property.name === '') {
      alertContent.push('Empty name')
    }

    if (
      (!property.address_1 || property.address_1 === '') &&
      (!property.address_2 || property.address_2 === '')
    ) {
      alertContent.push('No valid address')
    }

    if (!property.city || property.city === '') {
      alertContent.push('Empty city')
    }

    if (!property.postal_code || property.postal_code === '') {
      alertContent.push('Empty postal code')
    }

    return alertContent
  }

  save = async e => {
    e.preventDefault()

    const { property } = this.state
    const {
      contracts,
      accountData,
      setLoading,
      setProperty,
      history
    } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    let result = this.validator(property)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Property editing with invalid input',
        alertContent: result
      })
      return
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
    history.push('/')
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

    let result = this.validator(property)
    if (result.length !== 0) {
      this.setState({
        alertShow: true,
        alertHeader: 'Property creation with invalid input',
        alertContent: result
      })
      return
    }

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
    // this.setState({ mode: READING })

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

  handleToggleConfirm = async propertyId => {
    const { showConfirm } = this.state
    this.setState({ showConfirm: !showConfirm })

    if (propertyId !== -1) {
      this.setState({
        propertyId: propertyId
      })

      console.log(`handleToggleConfirm - propertyId: ${propertyId}`)
    }
  }

  async componentDidMount () {
    const { isCreating, properties, id } = this.props

    // Edit an existing property
    if (!isCreating) {
      let existingProperty = properties[id]
      this.setState({
        property: existingProperty
      })
    } else {
      // Create a new property
      this.setState({
        property: newProperty()
      })
    }
  }

  render () {
    const { isCreating, properties, id } = this.props

    return (
      <div>
        <PropertyDetails
          property={this.state.property}
          isCreating={isCreating}
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
        <Alert
          isOpen={this.state.alertShow}
          handleToggle={this.handleToggleAlert}
          alertHeader={this.state.alertHeader}
          alertContent={this.state.alertContent}
        />
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
