import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { TERMPRICE, FSMGRCONTRACT } from '../../../utils/consts'
import { addTermPrices } from '../../../actions/index'
import { ERR_DATA_LOADING_FAILED } from '../../../utils/error'

class TermPriceContainer extends Component {
  async componentDidMount () {
    const { eosClient, accountData, addTermPrices } = this.props

    try {
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        accountData.active,
        TERMPRICE
      )
      console.log('Get table "termpricing" result:', rows)

      try {
        addTermPrices(rows)
      } catch (err) {
        console.log('addTermPrices error:', err)
      }
    } catch (err) {
      console.log('Get table "termpricing" failed - err:', err)
    }
  }

  render () {
    const { properties, units } = this.props
    const { id } = this.props.match.params
    const unit = units[id]
    const property = properties[id]
    if (!property || !unit) {
      return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
    } else {
      return <Table propertyId={property.id} unitId={unit.id} unit={unit} />
    }
  }
}

function mapStateToProps ({
  units,
  eosClient,
  scatter,
  contracts,
  accountData
}) {
  return { units, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(mapStateToProps, { addTermPrices })(TermPriceContainer))
