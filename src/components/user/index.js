import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getResourceStr } from '../../actions'
import UserGeneral from './UserGeneral'

class UserGeneralContainer extends Component {
  constructor(props) {
    super(props)
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      activeTab: '1'
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  remainingPercent(used, max) {
    const remaining = max - used
    return new Intl.NumberFormat().format(100 * (remaining / max))
  }

  componentDidMount() {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    eosClient.getAccount(account).then(result => {
      const ramStr = getResourceStr({used: result.ram_usage, max: result.ram_quota})
      const ramMeter = this.remainingPercent(result.ram_usage, result.ram_quota).toString()

      const bandwidthStr = getResourceStr(result.net_limit)
      const bandwidthMeter = this.remainingPercent(result.net_limit.used, result.net_limit.max).toString()

      const cpuStr = getResourceStr(result.cpu_limit, true)
      const cpuMeter = this.remainingPercent(result.cpu_limit.used, result.cpu_limit.max).toString()

      const balance = result.core_liquid_balance

      let created = result.created
      let idx = created.indexOf('T') // cut away the time trailing
      created = created.substring(0, idx != -1 ? idx : created.length);
      // console.log('idx:', idx, ', created:', created)
      
      const pubkey = result.permissions[0].required_auth.keys[0].key

      const info = {
        account,
        created,
        balance,
        ramStr,
        ramMeter,
        bandwidthStr,
        bandwidthMeter,
        cpuStr,
        cpuMeter,
        pubkey
      }
      this.setState({ data: info })
    })
  }

  render() {
    const user = this.state.data
    return (
      <UserGeneral
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
)(UserGeneralContainer))