import React, { Component } from 'react'
import Navbar from './Navbar'
import CreateProperty from './CreateProperty'
import Footer from './Footer'
import {
    Container,
    Row,
    Col
} from 'reactstrap'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <CreateProperty />
        </Container>
        <Footer />
      </div>
    )
  }
}

export default App
