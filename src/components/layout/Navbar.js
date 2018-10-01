import React, { Component } from 'react'
import Logo from '../../img/logo.svg'
import IconProperties from '../../img/icon-properties.svg'
import IconUser from '../../img/icon-user.svg'
import IconLogout from '../../img/icon-logout.svg'


class NavbarContainer extends Component {
  state = {
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {isOpen} = this.state

    return (
      <div className="menu-holder">
        <div className="container">
            <div className="row">
              <div className="col-12">
                <a href="" className="logo">
                  <img src={Logo} alt="Logo"/>
                </a>
                <div className="storage">
                  <span className="badge badge-pill">15.06 GB</span>
                  <span className="storage-text">
                      {' '}Available Storage
                      {/* <small>(Purchase RAM)</small> */}
                  </span>
                </div>

                <ul id="main-menu">
                  <li><a href=""><img src={IconProperties} alt=""/> <span>Properties</span></a></li>
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
