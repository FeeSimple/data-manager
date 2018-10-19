import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

export const READING = 'reading'
export const EDITING = 'editing'
export const CREATING = 'creating'

const UserDetails = ({
  user,
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
            <h3 className="float-left">User Account Information</h3>
          </Col>
        </Row>
      </Container>
    </div>
    <br />
    <Container>
      <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
        <Row>
          <Col>
            <h3 className="user-detail-label">Name</h3>
          </Col>
          <Col>
            <h3 className="user-detail-label" id="account-name-lookup">Trung</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">Creation date</h3>
          </Col>
          <Col>
            <h3 
              className="user-detail-label" id="creation-lookup">Trung</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">Balance</h3>
          </Col>
          <Col>
            <h3 
              className="user-detail-label" id="balance-lookup">Trung</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">RAM</h3>
          </Col>
          <Col>
            <meter id="ram-lookup-meter" style={{width: 200}} low="0.5" optimum="0.4" high="0.7" value="0.75"></meter>
            <b className="user-detail-label" id="ram-lookup-text">75%</b>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">CPU</h3>
          </Col>
          <Col>
            <meter id="cpu-lookup-meter" style={{width: 200}} low="0.5" optimum="0.4" high="0.7" value="0.6"></meter>
            <b className="user-detail-label" id="cpu-lookup-text">60%</b>
          </Col>
        </Row>
        <Row>
            <Col>
              <h3 className="user-detail-label">Bandwidth</h3>
            </Col>
            <Col>
              <meter id="bandwidth-lookup-meter" style={{width: 200}} low="0.5" optimum="0.4" high="0.7" value="0.5"></meter>
              <b className="user-detail-label" id="bandwidth-lookup-text">50%</b>
            </Col>
          </Row>
        </div>
    </Container>
  </div>
)

export default UserDetails