import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { FLOORPLAN, FSMGRCONTRACT } from '../../../utils/consts'
import { addFloorplans, delFloorplan } from '../../../actions/index'
import { setLoading } from '../../../actions'

class FloorplansContainer extends Component {
  async componentDidMount () {
    const { eosClient, accountData, addFloorplans } = this.props
    const { id } = this.props.match.params

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      FLOORPLAN
    )
    addFloorplans(id, rows)
  }

  delete = async (propertyId, floorplanId) => {
    const { contracts, accountData, setLoading, history } = this.props
    const fsmgrcontract = contracts[FSMGRCONTRACT]

    const options = {
      authorization: `${accountData.active}@active`,
      broadcast: true,
      sign: true
    }

    setLoading(true)

    try {
      await fsmgrcontract.delfloorplan(accountData.active, floorplanId, options)
      console.log('fsmgrcontract.delfloorplan - floorplanId:', floorplanId)
    } catch (err) {
      console.log('fsmgrcontract.delfloorplan - error:', err)
    }

    try {
      delFloorplan(propertyId, floorplanId)
      history.push(`/${propertyId}/floorplan`)
    } catch (err) {
      console.log('delFloorplan error:', err)
    }

    setLoading(false)
  }

  render () {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    return (
      <Table
        propertyId={property.id}
        property={property}
        onDelete={this.delete}
      />
    )
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
  connect(mapStateToProps, { addFloorplans, setLoading, delFloorplan })(FloorplansContainer)
)
