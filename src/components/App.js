import React, { Component } from 'react'
import Navbar from './Navbar'
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Property Management</h1>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

export default App
