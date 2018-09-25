import React from 'react'
import { withRouter } from 'react-router'
import Properties from './properties/Properties'
import LoginContainer from './account/LoginContainer'
import Navbar from './layout/Navbar'
import { connect } from 'react-redux'
import LoadingView from './layout/LoadingView'

class AppContainer extends React.Component {
  render () {
    const { isLoading, eosClient } = this.props

    return (
      <div className='fsapp'>
        <Navbar />
        <div>
          {isLoading && <LoadingView />}
          {!isLoading && (
            <div>
              {eosClient.locked === true && <LoginContainer />}
              {eosClient.locked !== true && <Properties />}
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
