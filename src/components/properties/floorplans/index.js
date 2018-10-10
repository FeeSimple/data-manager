import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Table from './Table'


class FloorplansContainer extends Component {
  render() {
    return (
      <Table propertyId={0}/>
    )
  }
}

function mapStateToProps({ properties, eosClient, scatter, contracts, accountData }){
  return { properties, eosClient, scatter, contracts, accountData }
}

export default withRouter(connect(
  mapStateToProps
)(FloorplansContainer))