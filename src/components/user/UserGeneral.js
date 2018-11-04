import React from 'react'
import { 
  Col, Card, Row, Progress, UncontrolledTooltip
} from 'reactstrap'

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
  <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
    <Card body outline color="info">
      <Row>
        <Col>
          <h3 className="user-detail-label">Account Name</h3>
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
      <Row id="TooltipRam">
        <Col>
          <h3 className="user-detail-label">RAM</h3>
        </Col>
        <Col>
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
        <UncontrolledTooltip placement="left" target="TooltipRam" styleName="tooltip">
          <p>
            RAM is required to store, send, and receive data on the blockchain 
            such as creating/updating/deleting property
          </p>
        </UncontrolledTooltip>
      </Row>
      <Row id="TooltipCpu">
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
        <UncontrolledTooltip placement="left" target="TooltipCpu" styleName="tooltip">
          <p>
            CPU is for ...
            ..............
          </p>
        </UncontrolledTooltip>
      </Row>
      <Row id="TooltipBandwidth">
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
        <UncontrolledTooltip placement="left" target="TooltipBandwidth" styleName="tooltip">
          <p>
            Bandwidth is for ...
            .................
          </p>
        </UncontrolledTooltip>
        </Row>
    </Card>
  </div>
)

export default UserGeneral