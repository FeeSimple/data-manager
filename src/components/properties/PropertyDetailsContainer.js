import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setProperty, addProperties, setLoading } from '../../actions'
import PropertyDetails, { READING, EDITING, CREATING } from './PropertyDetails'
import { FSMGRCONTRACT } from '../../utils/consts'
import { PROPERTY } from '../../utils/consts'

class PropertyDetailsContainer extends Component {
  state = {
    mode: READING,
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

    const { property } = this.state
    const { setLoading, setProperty } = this.props

    setLoading(true)
    setProperty(property)
    setLoading(false)
  }

  create = async (e) => {
    e.preventDefault()
    const { addProperties, contracts, eosClient, accountData, setLoading } = this.props
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

function mapStateToProps({ properties, eosClient, scatter, contracts, accountData }){
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(
  mapStateToProps,
  { setProperty, addProperties, setLoading }
)(PropertyDetailsContainer))
