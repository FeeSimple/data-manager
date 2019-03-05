import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '../../img/feesimple-logo-outline.svg'
import IconProperties from '../../img/icon-properties.svg'
import IconWallet from '../../img/icon-wallet.svg'
import IconMarketplace from '../../img/icon-marketplace.svg'
import IconUser from '../../img/icon-user.svg'
import IconLogout from '../../img/icon-logout.svg'
import {
  setInfo,
  setActive,
  setFsMgrContract,
  setEosClient
} from '../../actions/index'
import { beautifyRam } from '../../utils/beautify'

class NavbarContainer extends Component {
  constructor () {
    super()
    this.state = { data: [] }
  }

  async componentDidMount () {
    const {
      eosClient,
      accountData,
      setEosClient,
      setFsMgrContract,
      contracts
    } = this.props

    let account = accountData.active
    let result = await eosClient.getAccount(account)
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
      <div className='menu-holder'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Link to='/' className='logo'>
                <img src={Logo} alt='Logo' />
              </Link>
              <ul id='main-menu'>
                <li>
                  <Link to='/'>
                    <img src={IconProperties} alt='' />
                    <span> Properties</span>
                  </Link>
                </li>
                <li>
                  <Link to='/user'>
                    <img src={IconWallet} alt='' />
                    <span> Wallet</span>
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <img src={IconMarketplace} alt='' />
                    <span> Marketplace</span>
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <img src={IconUser} alt='' />
                    <span> team_open_re</span>
                  </Link>
                </li>
              </ul>
              <Link to='/' onClick={this.handleLogout} className='logout'>
                <img src={IconLogout} alt=''/>
                <span> Sign Out</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, accountData, contracts }) {
  return { eosClient, accountData, contracts }
}

export default withRouter(
  connect(mapStateToProps, {
    setInfo,
    setActive,
    setFsMgrContract,
    setEosClient
  })(NavbarContainer)
)
