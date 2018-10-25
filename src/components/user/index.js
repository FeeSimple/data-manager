import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getResourceStr } from '../../actions'
import UserDetails from './UserDetails'

class UserDetailsContainer extends Component {
  constructor() {
    super()
    this.state = {data: []}
  }

  componentDidMount() {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    eosClient.getAccount(account).then(result => {
      const ramStr = getResourceStr({used: result.ram_usage, max: result.ram_quota})
      const ramMeter = (new Intl.NumberFormat().format(1-(result.ram_usage / result.ram_quota)).toString())

      const bandwidthStr = getResourceStr(result.net_limit)
      const bandwidthMeter = (new Intl.NumberFormat().format(1-(result.net_limit.used / result.net_limit.max)).toString())

      const cpuStr = getResourceStr(result.cpu_limit, true)
      const cpuMeter = (new Intl.NumberFormat().format(1-(result.cpu_limit.used / result.cpu_limit.max)).toString())

      const balance = result.core_liquid_balance
      const created = result.created
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
      <div>
        {typeof user === 'undefined' && <h1 className="text-center my-5 py-5">404 - Property not found</h1>}
        {
          typeof user !== 'undefined' &&
            <UserDetails
              user={user}
            />
        }
      </div>
    )
  }
}

function mapStateToProps({ eosClient, accountData }){
  return { eosClient, accountData }
}

export default withRouter(connect(
  mapStateToProps
)(UserDetailsContainer))