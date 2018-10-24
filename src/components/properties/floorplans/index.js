import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'
import { FLOORPLAN, FSMGRCONTRACT } from '../../../utils/consts'
import { addFloorplans } from '../../../actions/index'


class FloorplansContainer extends Component {
  async componentDidMount () {
    const { eosClient, accountData, addFloorplans, properties } = this.props
    const propertyId = this.props.match.params.id

    if(properties.floorplans && Object.keys(properties.floorplans).length > 0)
      return // Don't fetch data again if we already have it.

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      FLOORPLAN
    )
    addFloorplans(propertyId, rows)
  }

  render() {
    const { properties, id } = this.props
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