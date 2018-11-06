import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getResourceStr, beautifyBalance } from '../../utils/beautify'
import { getAccountInfo, manageRam, checkAccount } from '../../utils/eoshelper'
import { User, USERTAB } from './User'
import { 
  eosAdminAccount, getEosAdmin 
} from '../../utils/index'
import Eos from 'eosjs'

class UserContainer extends Component {
  constructor(props) {
    super(props)
    
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      data: [],
      activeTab: USERTAB.INFO,

      showModalRam: false, 
      resourceHandleErr: false, 
      isProcessing: false,

      showModalCpu: false,
      showModalBw: false
    }
  }

  handleToggleModalRam = () => {
    const { showModalRam } = this.state
    this.setState({showModalRam: !showModalRam})
  }

  handleToggleModalCpu = () => {
    const { showModalCpu } = this.state
    this.setState({showModalCpu: !showModalCpu})
  }

  handleToggleModalBw = () => {
    const { showModalBw } = this.state
    this.setState({showModalBw: !showModalBw})
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleManageRam = async (accountName, ramAmount) => {
    // Reset state
    this.setState({
      resourceHandleErr: false,
      isProcessing: true
    })

    const eosAdmin = getEosAdmin(Eos)

    // First, check if account exists
    let accountExist = await checkAccount(eosAdmin, accountName)
    if (!accountExist) {
      this.setState({
        resourceHandleErr: 'The enterted account: ' + accountName + ' does not exist',
        isProcessing: false
      })
    } else {
      let res = await manageRam(eosAdmin, accountName, eosAdminAccount.name, ramAmount)
      console.log('handleManageRam:', res)
      if (res.errMsg) {
        this.setState({
          resourceHandleErr: res.errMsg,
          isProcessing: false
        })
      } else {
        this.setState({
          resourceHandleErr: 'Success',
          isProcessing: false
        })
      }
    }
  }

  async componentDidMount() {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    let info = await getAccountInfo(eosClient, account)
    this.setState({ data: info })
  }

  render() {
    const user = this.state.data
    return (
      <User
        user={user}
        activeTab={this.state.activeTab}
        toggleTab={this.toggleTab}

        showModalRam={this.state.showModalRam}
        handleToggleModalRam={this.handleToggleModalRam}
        handleManageRam={this.handleManageRam}

        showModalCpu={this.state.showModalCpu}
        handleToggleModalCpu={this.handleToggleModalCpu}

        showModalBw={this.state.showModalBw}
        handleToggleModalBw={this.handleToggleModalBw}

        isProcessing={this.state.isProcessing}
        resourceHandleErr={this.state.resourceHandleErr}

      />
    )
  }
}

function mapStateToProps({ eosClient, accountData }){
  return { eosClient, accountData }
}

export default withRouter(connect(
  mapStateToProps
)(UserContainer))