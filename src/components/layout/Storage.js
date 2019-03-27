import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setInfo, setActive } from '../../actions/index'
import { beautifyRam } from '../../utils/beautify'

class NavbarContainer extends Component {
  constructor () {
    super()
    this.state = { data: [] }
  }

  componentDidMount () {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    eosClient.getAccount(account).then(result => {
      const created = result.created
      const ram = result.ram_quota
      const ramAvailable = beautifyRam(result.ram_quota - result.ram_usage)
      const bandwidth = result.delegated_bandwidth
      const pubkey = result.permissions[0].required_auth.keys[0].key
      const info = {
        account,
        created,
        ram,
        ramAvailable,
        bandwidth,
        pubkey
      }

      // Store into redux
      setInfo(info)

      this.setState({ data: info })
    })
  }

  beautifyRam (ram) {
    let cnt = 0
    while (cnt < 3 && ram >= 1024) {
      ram = ram / 1024
      cnt++
    }
    ram = new Intl.NumberFormat().format(ram)
    if (cnt === 0) {
      ram = ram.toString() + ' Byte'
    } else if (cnt === 1) {
      ram = ram.toString() + ' KB'
    } else if (cnt === 2) {
      ram = ram.toString() + ' MB'
    } else if (cnt === 3) {
      ram = ram.toString() + ' GB'
    }

    return ram
  }

  handleLogout = () => {
    this.props.setActive(null)
    this.props.setInfo(null)
  }

  render () {
    return (
      <div className='storage a-right'>
        <span className='storage-text'>Manage Storage </span>
        <span className='badge badge-pill'>{this.state.data.ramAvailable}</span>
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, accountData }) {
  return { eosClient, accountData }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      setInfo,
      setActive
    }
  )(NavbarContainer)
)
