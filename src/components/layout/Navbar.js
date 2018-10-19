import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '../../img/logo.svg'
import IconProperties from '../../img/icon-properties.svg'
import IconUser from '../../img/icon-user.svg'
import IconLogout from '../../img/icon-logout.svg'
import {
  setInfo,
  beautifyRam
} from '../../actions/index'

class NavbarContainer extends Component {
  constructor() {
    super();
    this.state = {data: []};
  }

  componentDidMount() {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    eosClient.getAccount(account).then(result => {
      console.log('getAccount: ', result)
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

  render() {
    return (
      <div className="menu-holder">
        <div className="container">
            <div className="row">
              <div className="col-12">
                <Link to="/" className="logo">
                  <img src={Logo} alt="Logo"/>
                </Link>
                <div className="storage">
                  <span className="badge badge-pill">{this.state.data.ramAvailable}</span>
                  <span className="storage-text">
                      {' '}Available Storage
                  </span>
                </div>

                <ul id="main-menu">
                  <li><Link to="/"><img src={IconProperties} alt=""/> <span>Properties</span></Link></li>
                  <li><Link to="/user"><img src={IconUser} alt=""/></Link></li>
                  <li><a href=""><img src={IconLogout} alt=""/></a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps({ eosClient, accountData }){
  return { eosClient, accountData }
}

export default withRouter(connect(
  mapStateToProps,
  {
    setInfo
  }
)(NavbarContainer))
