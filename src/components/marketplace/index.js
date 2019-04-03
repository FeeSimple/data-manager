import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class MarketplaceContainer extends Component {
  render () {
    return (
      <div>
        <div className='top-bar'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <h3 className='float-left'>Marketplace</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <p>Marketplace content area. (Coming soon....)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, accountData }) {
  return { eosClient, accountData }
}

export default withRouter(connect(mapStateToProps)(MarketplaceContainer))
