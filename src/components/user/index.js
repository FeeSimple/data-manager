import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getResourceStr, beautifyBalance } from '../../utils/beautify'
import { ERR_DATA_LOADING_FAILED } from '../../utils/error'
import { getAccountInfo, manageRam, checkAccount, manageCpuBw } from '../../utils/eoshelper'
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
      isBuy: false,
      
      resourceHandleErr: false, 
      isProcessing: false,

      showModalCpuBw: false,
      isCpu: false,
      isStake: false,
    }
  }

  resetState = () => {
    this.setState({
      isBuy: false,
      isCpu: false,
      isStake: false,
      showModalRam: false,
      showModalCpuBw: false
    })
    
    this.resetProcessing()
  }

  resetProcessing = () => {
    this.setState({
      resourceHandleErr: false, 
      isProcessing: false
    })
  }

  setBuy = () => {
    this.setState({
      isBuy: true
    })

    this.resetProcessing()
  }

  setSell = () => {
    this.setState({
      isBuy: false
    })

    this.resetProcessing()
  }

  setStake = () => {
    this.setState({
      isStake: true
    })

    this.resetProcessing()
  }

  setUnstake = () => {
    this.setState({
      isStake: false
    })

    this.resetProcessing()
  }

  handleToggleModalRam = () => {
    const { showModalRam } = this.state
    this.setState({
      showModalRam: !showModalRam
    })

    this.resetProcessing()

    // Update account info
    this.updateAccountInfo()
  }

  handleToggleModalCpuBw = async () => {
    const { showModalCpuBw } = this.state
    this.setState({
      showModalCpuBw: !showModalCpuBw
    })

    this.resetProcessing()

    // Update account info
    this.updateAccountInfo()
  }

  handleToggleModalCpu = () => {
    this.handleToggleModalCpuBw()
    this.state.isCpu = true
  }

  handleToggleModalBw = () => {
    this.handleToggleModalCpuBw()
    this.state.isCpu = false
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleManageCpuBw = async (xfsAmount) => {
    // Reset state
    this.setState({
      resourceHandleErr: false,
      isProcessing: true
    })

    const { eosClient, accountData } = this.props
    let activeAccount = accountData.active

    const { isCpu, isStake } = this.state
    let res = await manageCpuBw(eosClient, activeAccount, xfsAmount, isCpu, isStake)
      console.log('manageCpuBw:', res)
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

  handleManageRam = async (xfsAmount) => {
    // Reset state
    this.setState({
      resourceHandleErr: false,
      isProcessing: true
    })

    const { eosClient, accountData } = this.props
    let activeAccount = accountData.active
    let ramPrice = this.state.data.ramPrice
    let isBuy = this.state.isBuy
    let res = await manageRam(eosClient, activeAccount, xfsAmount, ramPrice, isBuy)
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

  updateAccountInfo = async () => {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    let info = await getAccountInfo(eosClient, account)
    this.setState({ data: info })
  }

  async componentDidMount() {
    this.updateAccountInfo()
  }

  render() {
    const user = this.state.data
    if (!user) {
      // You can render any custom fallback UI
      return <h1 className="error-message">{ERR_DATA_LOADING_FAILED}</h1>;
    }
    return (
      <User
        user={user}
        activeTab={this.state.activeTab}
        toggleTab={this.toggleTab}

        showModalRam={this.state.showModalRam}
        handleToggleModalRam={this.handleToggleModalRam}
        handleManageRam={this.handleManageRam}
        isBuy={this.state.isBuy}
        setBuy={this.setBuy}
        setSell={this.setSell}

        showModalCpuBw={this.state.showModalCpuBw}
        handleToggleModalCpuBw={this.handleToggleModalCpuBw}
        handleToggleModalCpu={this.handleToggleModalCpu}
        handleToggleModalBw={this.handleToggleModalBw}
        isCpu={this.state.isCpu}
        isStake={this.state.isStake}
        setStake={this.setStake}
        setUnstake={this.setUnstake}
        handleManageCpuBw={this.handleManageCpuBw}

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