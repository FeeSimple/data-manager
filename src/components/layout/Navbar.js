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
  setActive
} from '../../actions/index'

class NavbarContainer extends Component {

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

function mapStateToProps ({}) {
  return {}
}

export default withRouter(
  connect(mapStateToProps, {
    setInfo,
    setActive
  })(NavbarContainer)
)
