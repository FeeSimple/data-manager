import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../img/logo.svg'
import IconProperties from '../../img/icon-properties.svg'
import IconUser from '../../img/icon-user.svg'
import IconLogout from '../../img/icon-logout.svg'


class NavbarContainer extends Component {
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
                  <span className="badge badge-pill">15.06 GB</span>
                  <span className="storage-text">
                      {' '}Available Storage
                  </span>
                </div>

                <ul id="main-menu">
                  <li><Link to="/"><img src={IconProperties} alt=""/> <span>Properties</span></Link></li>
                  <li><a href=""><img src={IconUser} alt=""/> <span>team_open_re</span></a></li>
                  <li><a href=""><img src={IconLogout} alt=""/></a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default NavbarContainer
