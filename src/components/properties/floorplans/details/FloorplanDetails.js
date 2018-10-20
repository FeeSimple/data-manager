import React from 'react'
import { Col, Container, Row } from 'reactstrap'

export const READING = 'reading'
export const EDITING = 'editing'
export const CREATING = 'creating'

const FloorplanDetails = ({
  floorplan,
  mode,
  onEditClick,
  onCreateClick,
  onSaveClick,
  onChange
}) => (
  <div>
    <div className="top-bar">
      <Container>
        <Row>
          <Col>
            <h3 className="float-left">New Floorplan</h3>
          </Col>
        </Row>
      </Container>
    </div>
    <br />
    <Container>
      <h2>Hello florplans</h2>
    </Container>
  </div>
)

export default FloorplanDetails