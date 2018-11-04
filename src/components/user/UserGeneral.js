import React from 'react'
import { 
  Col, Card, Row, Progress, UncontrolledTooltip,
  ListGroup, ListGroupItem
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
    <Card>
      <ListGroup>
        <ListGroupItem>
          <Row>
            <Col>
              <h3 className="user-detail-label">Account Name</h3>
            </Col>
            <Col>
              <h3 className="user-detail-label">{user.account}</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>
              <h3 className="user-detail-label">Creation date</h3>
            </Col>
            <Col>
              <h3
                className="user-detail-label">{user.created}</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>
              <h3 className="user-detail-label">Balance</h3>
            </Col>
            <Col>
              <h3
                className="user-detail-label">{user.balance}</h3>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row id="TooltipRam">
            <Col>
              <h3 className="user-detail-label">RAM</h3>
            </Col>
            <Col>
              <div className="user-detail-label-small">
                Staked: {user.stakedRam}
              </div>
              <Progress 
                className="user-detail-label" 
                value={user.ramMeter} 
                color={progressColor(user.ramMeter)}
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
        </ListGroupItem>
        <ListGroupItem>
          <Row id="TooltipCpu">
            <Col>
              <h3 className="user-detail-label">CPU</h3>
            </Col>
            <Col>
              <div className="user-detail-label-small">
                Staked: {user.stakedCpu}
              </div>
              <Progress 
                className="user-detail-label" 
                value={user.cpuMeter}
                color={progressColor(user.cpuMeter)}
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
        </ListGroupItem>
        <ListGroupItem>
          <Row id="TooltipBandwidth">
        <Col>
          <h3 className="user-detail-label">Bandwidth</h3>
        </Col>
        <Col>
          <div className="user-detail-label-small">
            Staked: {user.stakedBandwidth}
          </div>
          <Progress 
            className="user-detail-label" 
            value={user.bandwidthMeter} 
            color={progressColor(user.bandwidthMeter)}
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
        </ListGroupItem>
      </ListGroup>
    </Card>
  </div>
)

export default UserGeneral