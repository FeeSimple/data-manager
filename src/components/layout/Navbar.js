import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Logo from '../../img/feesimple-logo-outline.svg'
import IconProperties from '../../img/icon-properties.svg'
import IconWallet from '../../img/icon-wallet.svg'
import IconMarketplace from '../../img/icon-marketplace.svg'
import IconLogout from '../../img/icon-logout.svg'
import {
  setInfo,
  setActive,
  setFsMgrContract,
  setEosClient
} from '../../actions/index'
import { getAccountInfo } from '../../utils/eoshelper'
import { Badge } from 'reactstrap'

class NavbarContainer extends Component {
  constructor () {
    super()
    this.state = { info: null }
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
    let result = await getAccountInfo(eosClient, account)
    const created = result.created
    const ramMeter = result.ramMeter
    const cpuMeter = result.cpuMeter
    const bandwidthMeter = result.bandwidthMeter
    const pubkey = result.pubkey
    const info = {
      account,
      created,
      ramMeter,
      cpuMeter,
      bandwidthMeter,
      pubkey
    }

    // Store into redux
    setInfo(info)

    this.setState({ info })
  }

  beautifyRam (ram) {
    let cnt = 0
    while (cnt < 3 && ram >= 1024) {
      ram = ram / 1024
      cnt++
    }
    ram = new Intl.NumberFormat().format(ram)
    if (cnt === 0) {
      ram = ram.toString() + ' Bytes'
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
    const { info } = this.state
    return (
      <div className='menu-holder'>
        <div className='container fix-mobile-nav'>
          <div className='row'>
            <div className='col-12'>
              <Link to='/' className='logo'>
                <img src={Logo} alt='Logo' />
              </Link>
              <span className='nav-title'>
                {info && (
                  <span style={{ fontSize: '14px' }}>
                    {info.account}
                  </span>
                )}
              </span>
              <ul id='main-menu' class="mb-4">
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
                  <Link to='/marketplace'>
                    <img src={IconMarketplace} alt='' />
                    <span> Marketplace</span>
                  </Link>
                </li>
              </ul>
              <div className='memory-stat ms-row'>
                <div className='ms-col p-l-20 p-r-20'>
                  <h3>RAM</h3>
                  <CircularProgressbar
                    percentage={info ? Number(info.ramMeter).toFixed(0) : ''}
                    strokeWidth={10}
                    text={info ? Number(info.ramMeter).toFixed(0) + '%' : ''}
                    styles={{
                      text: {
                        fill: '#fff',
                        fontWeight: 'bold',
                        fontSize: '25px'
                      }
                    }}
                    initialAnimation={true}
                  />
                </div>
                <div className='ms-col p-l-20 p-r-20'>
                  <h3>CPU</h3>
                  <CircularProgressbar
                    percentage={info ? Number(info.cpuMeter).toFixed(0) : ''}
                    strokeWidth={10}
                    text={info ? Number(info.cpuMeter).toFixed(0) + '%' : ''}
                    styles={{
                      text: {
                        fill: '#fff',
                        fontWeight: 'bold',
                        fontSize: '25px'
                      }
                    }}
                    initialAnimation={true}
                  />
                </div>
                <div className='ms-col p-l-20 p-r-20'>
                  <h3>NET</h3>
                  <CircularProgressbar
                    percentage={
                      info ? Number(info.bandwidthMeter).toFixed(0) : ''
                    }
                    strokeWidth={10}
                    text={
                      info ? Number(info.bandwidthMeter).toFixed(0) + '%' : ''
                    }
                    styles={{
                      text: {
                        fill: '#fff',
                        fontWeight: 'bold',
                        fontSize: '25px'
                      }
                    }}
                    initialAnimation={true}
                  />
                </div>
              </div>

              <Link to='/' onClick={this.handleLogout} className='logout'>
                <img src={IconLogout} alt='' />
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
  connect(
    mapStateToProps,
    {
      setInfo,
      setActive,
      setFsMgrContract,
      setEosClient
    }
  )(NavbarContainer)
)
