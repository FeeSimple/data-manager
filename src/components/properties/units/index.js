import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { UNIT, FSMGRCONTRACT } from '../../../utils/consts'
import { addUnits, delUnit } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import { setLoading } from '../../../actions'

class UnitContainer extends Component {
  async componentDidMount () {
    const { eosClient, accountData, addUnits } = this.props

    try {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        UNIT
      )
      console.log('Get table "unit" result:', rows)

      try {
        addUnits(rows)
      } catch (err) {
        console.log('addUnits error:', err)
      }
    } catch (err) {
      console.log('Get table "unit" failed - err:', err)
    }
  }

  delete = async (propertyId, unitId) => {

    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    try {
      await fsmgrcontract.delunit(
        accountData.active,
        unitId,
        options
      )
      console.log('fsmgrcontract.delunit - unitId:', unitId)
    } catch (err) {
      console.log('fsmgrcontract.delunit - error:', err)
    }

    try {
      delUnit(propertyId, unitId)
      history.push(`/${propertyId}/unit`)
    } catch (err) {
      console.log('setUnit error:', err)
    }

    setLoading(false)
  }

  render () {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    if (!property) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return <Table propertyId={property.id} property={property} onDelete={this.delete}/>
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
  connect(mapStateToProps, { addUnits, setLoading, delUnit }
)(UnitContainer))
