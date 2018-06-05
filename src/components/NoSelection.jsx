import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Button,
    Container
} from 'reactstrap'

class NoSelection extends Component {
  render() {
    return (
      <div className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <h4>Start by create a new property or selecting an item on the left.</h4>
        </Row>
      </div>
    )
  }
}

export default NoSelection
