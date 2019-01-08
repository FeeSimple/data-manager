import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { TERMPRICE, FSMGRCONTRACT } from '../../../utils/consts'
import { addTermPrices } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'

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

  render () {
    const { properties } = this.props
    const { id, unitid } = this.props.match.params
    const property = properties[id]
    const unit = property.units[unitid]

    if (!property || !unit) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return <Table propertyId={property.id} unitid={unitid} unit={unit} />
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
  connect(mapStateToProps, { addTermPrices })(TermPriceContainer)
)
