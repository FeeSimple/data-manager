import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Properties from './Properties'
import Navbar from './Navbar'


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Properties />
        </Container>
      </div>
    )
  }
}

export default App
