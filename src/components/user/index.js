import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getResourceStr, beautifyBalance } from '../../utils/beautify'
import { getAccountInfo } from '../../utils/eoshelper'
import { User, USERTAB } from './User'

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

        showModalCpu={this.state.showModalCpu}
        handleToggleModalCpu={this.handleToggleModalCpu}

        showModalBw={this.state.showModalBw}
        handleToggleModalBw={this.handleToggleModalBw}

        isProcessing={this.isProcessing}
        resourceHandleErr={this.resourceHandleErr}

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