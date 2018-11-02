import React from 'react'
import { Col, Container, Row, Progress } from 'reactstrap'
const meterControl = 'low="0.5" optimum="0.6" high="0.3"'

const UserAccount = ({
  user
}) => (
  <div>
    <Container>
      <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
        <Row>
          <Col>
            <h3 className="user-detail-label">Name</h3>
          </Col>
          <Col>
            <h3 className="user-detail-label">{user.account}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">Creation date</h3>
          </Col>
          <Col>
            <h3
              className="user-detail-label">{user.created}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">Balance</h3>
          </Col>
          <Col>
            <h3
              className="user-detail-label">{user.balance}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">Available RAM</h3>
          </Col>
          <Col width="200">
            <Progress className="user-detail-label" value={user.ramMeter} />
            <div className="user-detail-label-small">{user.ramStr}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">Available CPU</h3>
          </Col>
          <Col>
            <Progress className="user-detail-label" value={user.cpuMeter} />
            <div className="user-detail-label-small">{user.cpuStr}</div>
          </Col>
        </Row>
        <Row>
            <Col>
              <h3 className="user-detail-label">Available Bandwidth</h3>
            </Col>
            <Col>
              <Progress className="user-detail-label" value={user.bandwidthMeter} />
              <div className="user-detail-label-small">{user.bandwidthStr}</div>
            </Col>
          </Row>
        </div>
    </Container>
  </div>
)

export default UserAccount