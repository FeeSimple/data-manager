import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import LoginContainer from './account/LoginContainer'
import App from './App'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import LoadingView from './layout/LoadingView'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'
import 'react-images-uploader-fs/styles.css'
import { setOpResult } from '../actions'

class RootContainer extends Component {
  handleOnConfirm = () => {
    this.props.setOpResult({
      show: false,
      title: '',
      text: '',
      type: 'error'
    })
  }

  render () {
    const { eosClient, isLoading } = this.props
    let opResult = this.props.opResult

    if (eosClient.locked === true) {
      return <LoginContainer />
    }

    return (
      <div className='main-wrapper'>
        <Navbar />
        {!isLoading && <App />}
        {isLoading && <LoadingView />}
        {opResult &&
          opResult.data && (
            <SweetAlert
              show={opResult.data.show}
              type={opResult.data.type}
              title={opResult.data.title}
              text={opResult.data.text}
              onConfirm={this.handleOnConfirm}
            />
          )}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps ({ isLoading, eosClient, opResult }) {
  return { isLoading, eosClient, opResult }
}

export default withRouter(
  connect(mapStateToProps, { setOpResult })(RootContainer)
)
