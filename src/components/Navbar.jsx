import React, { Component } from 'react'
import { Navbar as BSNavbar } from 'reactstrap'
import logo from '../feesimple-logo.svg'
import {
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

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
      <Navbar isOpen={isOpen} logo={logo} onToggleClick={this.toggle}/>
    )
  }
}

const Navbar = ({isOpen,logo,onToggleClick}) => (
  <div className="fsnavbar">
    <BSNavbar color="light" light fixed="top" expand="md">
      <a href="/properties">
        <img src={logo} className="fsnavbar-logo" alt="logo"/>
      </a>
      <NavbarToggler onClick={onToggleClick} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="http://feesimple.io">FeeSimple Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/feesimple">Github</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="http://feesimple.io/pdf/FeeSimple-Whitepaper-v0.8.0.pdf">Whitepaper</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </BSNavbar>
  </div>
)

export default NavbarContainer
