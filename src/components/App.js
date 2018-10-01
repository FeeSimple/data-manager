import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'

class AppContainer extends Component {
  render () {
    const { eosClient } = this.props
    return (
      <div>
        {eosClient.locked === true && <LoginContainer />}
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
