import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'
import App from './App'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import LoadingView from './layout/LoadingView'
import 'react-images-uploader-fs/styles.css'

class RootContainer extends Component {
  render () {
    const { eosClient, isLoading } = this.props

    if(eosClient.locked === true){
      return <LoginContainer />
    }

    return (
      <div>
        <Navbar />
        {!isLoading && <App />}
        {isLoading && <LoadingView />}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(RootContainer))