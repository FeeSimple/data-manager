import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'
import App from './App'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import LoadingView from './layout/LoadingView'
import { ErrorPopup } from './layout/ErrorPopup'
import 'react-images-uploader-fs/styles.css'

class RootContainer extends Component {
  render () {
    const { eosClient, isLoading, errMsg } = this.props

    if (eosClient.locked === true) {
      return <LoginContainer />
    }

    return (
      <div class='main-wrapper'>
        <Navbar />
        {errMsg && <ErrorPopup errMsg={errMsg} />}
        {!isLoading && <App />}
        {isLoading && <LoadingView />}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient, errMsg }) {
  return { isLoading, eosClient, errMsg }
}

export default withRouter(connect(mapStateToProps)(RootContainer))
