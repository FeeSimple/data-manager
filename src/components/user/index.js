import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getResourceStr, beautifyBalance } from '../../utils/beautify'
import { getAccountInfo } from '../../utils/eoshelper'
import { User, USERTAB } from './User'

class UserContainer extends Component {
  constructor(props) {
    super(props)
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      activeTab: USERTAB.GENERAL
    }
  }

  toggle(tab) {
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
        toggle={this.toggle}
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