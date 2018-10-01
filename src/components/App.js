import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'
import Properties from './properties/Properties'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

class AppContainer extends Component {
  render () {
    const { eosClient } = this.props

    if(eosClient.locked === true){
      return <LoginContainer />
    }

    return (
      <div>
        <Navbar />
        <Properties />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
