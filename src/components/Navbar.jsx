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


class Navbar extends Component {
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
      <div>
        <BSNavbar color="inverse" light expand="md">
          <img src={logo} className="fsnavbar-logo" alt="logo" href=""/>
          <NavbarToggler onClick={this.toggle} />
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
  }
}

export default Navbar
