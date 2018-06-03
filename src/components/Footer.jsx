import React, { Component } from 'react'
import logo from '../feesimple-logo.svg'
import {
  Container
} from 'reactstrap'

class Footer extends Component {
  render () {
    return (
      <div className='fsfooter'>
        <Container>
          <img src={logo} className='fsfooter-logo' alt='logo' href='/' />
        </Container>
      </div>
    )
  }
}

export default Footer
