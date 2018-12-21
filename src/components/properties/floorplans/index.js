import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { FLOORPLAN, FSMGRCONTRACT } from '../../../utils/consts'
import { addFloorplans } from '../../../actions/index'


class FloorplansContainer extends Component {
  async componentDidMount () {
    const { eosClient, accountData, addFloorplans } = this.props

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      FLOORPLAN
    )
    addFloorplans(rows)
  }

  render() {
    const { properties } = this.props
    const { id } = this.props.match.params
    const property = properties[id]
    return (
      <Table propertyId={property.id} property={property}/>
    )
  }
}

function mapStateToProps({ properties, eosClient, scatter, contracts, accountData }){
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(
  mapStateToProps,
  { addFloorplans }
)(FloorplansContainer))