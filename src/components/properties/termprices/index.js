import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { TERMPRICE, FSMGRCONTRACT } from '../../../utils/consts'
import { addTermPrices, delTermPrice } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'
import { setLoading } from '../../../actions'

class TermPriceContainer extends Component {
  async componentDidMount () {
    const { eosClient, accountData, addTermPrices, properties } = this.props
    const { id, unitid } = this.props.match.params
    const property = properties[id]
    const unit = property.units[unitid]

    try {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        TERMPRICE
      )
      console.log('Get table "termpricing" result:', rows)

      try {
        addTermPrices(id, unitid, rows)
      } catch (err) {
        console.log('addTermPrices error:', err)
      }
    } catch (err) {
      console.log('Get table "termpricing" failed - err:', err)
    }
  }

  delete = async (propertyId, unitId, termpriceId) => {
    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    try {
      await fsmgrcontract.deltmpricing(accountData.active, termpriceId, options)
      console.log('fsmgrcontract.deltmpricing - unitId:', unitId)
    } catch (err) {
      console.log('fsmgrcontract.deltmpricing - error:', err)
    }

    try {
      delTermPrice(propertyId, unitId, termpriceId)
      history.push(`/${propertyId}/unit/${unitId}/termprice`)
    } catch (err) {
      console.log('delTermPrice error:', err)
    }

    setLoading(false)
  }

  render () {
    const { properties } = this.props
    const { id, unitid, termid } = this.props.match.params
    const property = properties[id]
    const unit = property.units[unitid]

    if (!property || !unit) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return (
        <Table
          propertyId={property.id}
          unitid={unitid}
          unit={unit}
          termid={termid}
          onDelete={this.delete}
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
  connect(mapStateToProps, { addTermPrices, setLoading, delTermPrice })(
    TermPriceContainer
  )
)
