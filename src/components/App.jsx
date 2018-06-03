import React, { Component } from 'react'
import Navbar from './Navbar'
import PropertyDetails from './PropertyDetails'
import { Container } from 'reactstrap'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <PropertyDetails />
        </Container>
      </div>
    )
  }
}

export default App
