import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'

class AppContainer extends Component {
  render () {
    const { eosClient } = this.props

    if(eosClient.locked === true){
      return <LoginContainer />
    }

    return (
      <div>
        eosClient unlocked.
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
