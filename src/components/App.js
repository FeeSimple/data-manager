import React, { Component } from 'react'
import Navbar from './Navbar'
import PropertyList from './PropertyList'
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
          <PropertyList />
        </Container>        
      </div>
    )
  }
}

export default App
