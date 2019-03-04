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
import { setOpResult, setInfo, setActive, setLoading } from '../actions'

class RootContainer extends Component {
  handleOnConfirm = () => {
    this.props.setOpResult({
      show: false,
      title: '',
      text: '',
      type: 'error'
    })
  }

  handleBeforeUnload = () => {
    this.props.setActive(null)
    this.props.setInfo(null)
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.handleBeforeUnload();
    })
  }

  componentDidMount() {
    // this.setupBeforeUnloadListener();
  }

  render () {
    const { eosClient, isLoading, accountData, setLoading } = this.props
    let opResult = this.props.opResult
    if (!accountData || !accountData.active) {
      return <LoginContainer />
    }

    if (eosClient.locked) {
      setLoading(false)
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

function mapStateToProps ({ isLoading, eosClient, opResult, accountData }) {
  return { isLoading, eosClient, opResult, accountData }
}

export default withRouter(
  connect(mapStateToProps, { setOpResult, setInfo, setActive, setLoading })(RootContainer)
)
