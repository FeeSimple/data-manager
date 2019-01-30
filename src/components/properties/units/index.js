import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { UNIT, FSMGRCONTRACT } from '../../../utils/consts'
import { addUnits, delUnit } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import { setLoading } from '../../../actions'

class UnitContainer extends Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.deleteOne = this.deleteOne.bind(this)
    this.deleteBulk = this.deleteBulk.bind(this)
    this.state = {
      checkedEntry: {}
    }
  }

  async componentDidMount () {
    const { eosClient, accountData, addUnits } = this.props
    const { id } = this.props.match.params

    try {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        UNIT
      )
      console.log('Get table "unit" result:', rows)

      try {
        addUnits(id, rows)
      } catch (err) {
        console.log('addUnits error:', err)
      }
    } catch (err) {
      console.log('Get table "unit" failed - err:', err)
    }
  }

  deleteOne = async (propertyId, unitId) => {
    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    try {
      await fsmgrcontract.delunit(accountData.active, unitId, options)
      console.log('fsmgrcontract.delunit - unitId:', unitId)
    } catch (err) {
      console.log('fsmgrcontract.delunit - error:', err)
    }

    try {
      delUnit(propertyId, unitId)
      history.push(`/${propertyId}/unit`)
    } catch (err) {
      console.log('delUnit error:', err)
    }

    setLoading(false)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    // console.log(`handleInputChange - name: ${name}, value: ${value}`);

    let checked = this.state.checkedEntry
    checked[name] = value
    this.setState({
      checkedEntry: checked
    })

    // console.log('handleInputChange - this.state.checkedEntry:', this.state.checkedEntry);
  }

  deleteBulk = async propertyId => {
    let checkedEntry = this.state.checkedEntry
    let ids = Object.keys(checkedEntry)
    console.log(`deleteBulk - propertyId: ${propertyId}`)
    console.log('deleteBulk - ids: ', ids)

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      if (checkedEntry[id] == true) {
        console.log(`deleteBulk - id: ${id}`)
        await this.deleteOne(propertyId, id)
      }
    }
  }

  render () {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return (
        <Table
          propertyId={property.id}
          property={property}
          onDelete={this.deleteOne}
          onChange={this.handleInputChange}
          deleteBulk={this.deleteBulk}
        />
      )
    }
  }
}

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
  connect(mapStateToProps, { addUnits, setLoading, delUnit })(UnitContainer)
)
