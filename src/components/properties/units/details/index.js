import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setUnit, setLoading, setErrMsg } from '../../../../actions'
import UnitDetails, { READING, EDITING, CREATING } from './UnitDetails'
import { FSMGRCONTRACT } from '../../../../utils/consts'

class UnitDetailsContainer extends Component {
  state = {
    mode: READING,
    prevUnit: {},
    unit: newUnit()
  }

  onImageDrop = files => {
    console.info('got file')
  }

  edit = (e, unit) => {
    e.preventDefault()

    this.setState({
      mode: EDITING,
      unit,
      prevUnit: {
        ...unit
      }
    })
  }

  save = async e => {
    e.preventDefault()

    const propertyId = this.props.match.params.id
    const { unit } = this.state
    const { contracts, accountData, setLoading, setUnit } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)
    await fsmgrcontract.modunit(
      accountData.active,
      unit.id,
      propertyId,
      unit.name,
      unit.bedrooms,
      unit.bathrooms,
      unit.sq_ft_min,
      unit.sq_ft_max,
      unit.rent_min,
      unit.rent_max,
      unit.status,
      new Date(unit.date_available).getTime(),
      options
    )

    setUnit(propertyId, unit)
    setLoading(false)
  }

  create = async e => {
    e.preventDefault()

    const {
      contracts,
      accountData,
      setLoading,
      setErrMsg,
      history
    } = this.props
    const propertyId = this.props.match.params.id
    const { unit } = this.state
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }
    this.setState({ mode: READING })

    setLoading(true)
    
    // console.log('new unit time: ', unit.date_available)
    // console.log('new unit time: ', new Date(unit.date_available).getTime())
    // console.log('unit time: 1545609600000, date: ', new Date(1545609600000).toLocaleDateString()) 
    

    try {
      await fsmgrcontract.addunit(
        accountData.active,
        propertyId,
        unit.name,
        unit.bedrooms,
        unit.bathrooms,
        unit.sq_ft_min,
        unit.sq_ft_max,
        unit.rent_min,
        unit.rent_max,
        unit.status,
        new Date(unit.date_available).getTime(),
        options
      )
    } catch (err) {
      setErrMsg('Failed to create new unit')
      console.log('fsmgrcontract.addunit - error:', err)
    }

    try {
      setUnit(propertyId, unit)
      history.push(`/${propertyId}/unit`)
    } catch (err) {
      console.log('setUnit error:', err)
    }

    setLoading(false)
  }

  handleChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState(prevState => {
      let state = {
        ...prevState
      }
      state.unit = {
        ...prevState.unit,
        [name]: value
      }
      return state
    })
  }

  render () {
    const { isCreating, properties } = this.props
    const { id, unitId } = this.props.match.params
    const { units } = properties[id]

    const mode = isCreating ? CREATING : this.state.mode
    let unit =
      mode === EDITING || mode === CREATING ? this.state.unit : units[unitId]
    return (
      <div>
        {typeof unit === 'undefined' && (
          <h1 className='text-center my-5 py-5'>404 - Unit not found</h1>
        )}
        {typeof unit !== 'undefined' && (
          <UnitDetails
            unit={unit}
            mode={mode}
            onEditClick={this.edit}
            onSaveClick={this.save}
            onCreateClick={this.create}
            onCancelClick={this.cancel}
            onChange={e => this.handleChange(e)}
            onImageDrop={this.onImageDrop}
          />
        )}
      </div>
    )
  }
}

const newUnit = () => ({
  name: '',
  bedrooms: 0,
  bathrooms: 0,
  sq_ft_min: 0,
  sq_ft_max: 0,
  rent_min: 0,
  rent_max: 0,
  status: '',
  date_available: ''
})

function mapStateToProps ({
  eosClient,
  scatter,
  contracts,
  accountData,
  properties
}) {
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(
  connect(mapStateToProps, { setUnit, setLoading, setErrMsg })(
    UnitDetailsContainer
  )
)
