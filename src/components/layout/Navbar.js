import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '../../img/logo.svg'
import IconProperties from '../../img/icon-properties.svg'
import IconUser from '../../img/icon-user.svg'
import IconLogout from '../../img/icon-logout.svg'
import { setInfo, setActive, setFsMgrContract, setEosClient, setOpResult } from '../../actions/index'
import { beautifyRam } from '../../utils/beautify'
import { getImportedKeyEos } from '../../utils/index'
import Eos from 'eosjs'
import { FSMGRCONTRACT } from '../../utils/consts'

class NavbarContainer extends Component {
  constructor () {
    super()
    this.state = { data: [] }
  }

  async componentDidMount () {
    const { eosClient, accountData, setEosClient, setFsMgrContract } = this.props

    if (accountData && accountData.active && accountData.info) {
      let privKey = accountData.info.privKey
      let eosClient = getImportedKeyEos(Eos, privKey)
      setEosClient(eosClient)
      setFsMgrContract(await eosClient.contract(FSMGRCONTRACT))
      setOpResult({
        show: false,
        title: '',
        text: '',
        type: 'error'
      })
      console.log('Navbar componentDidMount - setEosClient and setFsMgrContract');
    }

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
      <div className='menu-holder'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Link to='/' className='logo'>
                <img src={Logo} alt='Logo' />
              </Link>
              <div className='storage'>
                <span className='badge badge-pill'>
                  {this.state.data.ramAvailable}
                </span>
                <span className='storage-text'> Available Storage</span>
              </div>

              <ul id='main-menu'>
                <li>
                  <Link to='/'>
                    <img src={IconProperties} alt='' />
                  </Link>
                </li>
                <li>
                  <Link to='/user'>
                    <img src={IconUser} alt='' />
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <img src={IconLogout} alt='' onClick={this.handleLogout} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, accountData }) {
  return { eosClient, accountData }
}

export default withRouter(
  connect(mapStateToProps, {
    setInfo,
    setActive,
    setFsMgrContract, setEosClient
  })(NavbarContainer)
)
