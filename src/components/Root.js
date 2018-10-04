import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'
import App from './App'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

class RootContainer extends Component {
  render () {
    const { eosClient } = this.props

    if(eosClient.locked === true){
      return <LoginContainer />
    }

    return (
      <div>
        <Navbar />
        <App />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(RootContainer))