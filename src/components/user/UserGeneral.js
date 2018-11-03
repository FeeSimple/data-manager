import React from 'react'
import { Col, Container, Row, Progress } from 'reactstrap'

const progressColor = (valueStr) => {
  let val = parseInt(valueStr)
  if (val >= 50) {
    return null // blue color
  } else if (val >= 20) {
    return "warning"
  } else {
    return "danger"
  }
}

const UserGeneral = ({
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
            <h3 className="user-detail-label">RAM</h3>
          </Col>
          <Col width="200">
            <Progress 
              className="user-detail-label" 
              value={user.ramMeter} 
              color={progressColor(user.ramMeter)}
              animated
            >
              {user.ramMeter + ' %'}
            </Progress>
            <div className="user-detail-label-small">
              Available / Max &nbsp; &nbsp; &nbsp; {user.ramStr}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="user-detail-label">CPU</h3>
          </Col>
          <Col>
            <Progress 
              className="user-detail-label" 
              value={user.cpuMeter}
              color={progressColor(user.cpuMeter)}
              animated
            >
              {user.cpuMeter + ' %'}
            </Progress>
            <div className="user-detail-label-small">
              Available / Max &nbsp; &nbsp; &nbsp; {user.cpuStr}
            </div>
          </Col>
        </Row>
        <Row>
            <Col>
              <h3 className="user-detail-label">Bandwidth</h3>
            </Col>
            <Col>
              <Progress 
                className="user-detail-label" 
                value={user.bandwidthMeter} 
                color={progressColor(user.bandwidthMeter)}
                animated
              >
                {user.bandwidthMeter + ' %'}
              </Progress>
              <div className="user-detail-label-small">
                Available / Max &nbsp; &nbsp; &nbsp; {user.bandwidthStr}
              </div>
            </Col>
          </Row>
        </div>
    </Container>
  </div>
)

export default UserGeneral