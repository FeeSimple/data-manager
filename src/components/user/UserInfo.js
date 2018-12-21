import React from 'react'
import { 
  Col, Card, Row, Progress, UncontrolledTooltip,
  ListGroup, ListGroupItem, Button
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

const UserInfo = ({
  user,
  handleToggleModalRam,
  handleToggleModalCpu,
  handleToggleModalBw
}) => (
  <div className="col-lg-8 offset-md-1 offset-lg-2">
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
              <h3 className="user-detail-label">Creation Date</h3>
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
              <h3 className="user-detail-label">Spendable Balance</h3>
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
              <Button size="sm" onClick={handleToggleModalRam}>Buy/Sell</Button>
            </Col>
            <Col>
              <div className="user-detail-label-small">
                Staked: {user.stakedRam} &nbsp; &nbsp; {user.ramPriceStr}
              </div>
              <Progress 
                className="user-detail-label" 
                value={user.ramMeter} 
                color={progressColor(user.ramMeter)}
              >
                {user.ramMeter + ' %'}
              </Progress>
              <div className="user-detail-label-small">
                Available / Max &nbsp; &nbsp; &nbsp;   {user.ramStr}
              </div>
            </Col>
            <UncontrolledTooltip placement="left" target="TooltipRam" styleName="tooltip">
              <p>
                RAM needs to be staked (with XFS coins)
              </p>
              <p>
                for creating/editing/deleting the property.
              </p>
            </UncontrolledTooltip>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row id="TooltipCpu">
            <Col>
              <h3 className="user-detail-label">CPU</h3>
              <Button size="sm" onClick={handleToggleModalCpu}>Stake/Unstake</Button>
            </Col>
            <Col>
              <div className="user-detail-label-small">
                Staked: {user.stakedCpu} 
                {user.unstakedCpu ?
                  <span>&nbsp; &nbsp; &nbsp;  (Unstaked: {user.unstakedCpu})</span>
                :
                  <span></span>
                }
              </div>
              <Progress 
                className="user-detail-label" 
                value={user.cpuMeter}
                color={progressColor(user.cpuMeter)}
              >
                {user.cpuMeter + ' %'}
              </Progress>
              <div className="user-detail-label-small">
                Available / Max &nbsp; &nbsp; &nbsp;   {user.cpuStr}
              </div>
            </Col>
            <UncontrolledTooltip placement="left" target="TooltipCpu" styleName="tooltip">
              <p>
                CPU needs to be staked (with XFS coins)
              </p>
              <p>
                for creating/editing/deleting the property.
              </p>
            </UncontrolledTooltip>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row id="TooltipBandwidth">
        <Col>
          <h3 className="user-detail-label">Bandwidth</h3>
          <Button size="sm" onClick={handleToggleModalBw}>Stake/Unstake</Button>
        </Col>
        <Col>
          <div className="user-detail-label-small">
            Staked: {user.stakedBandwidth}
            {user.unstakedBandwidth ?
              <span>&nbsp; &nbsp; &nbsp;  (Unstaked: {user.unstakedBandwidth})</span>
            :
              <span></span>
            }
          </div>
          <Progress 
            className="user-detail-label" 
            value={user.bandwidthMeter} 
            color={progressColor(user.bandwidthMeter)}
          >
            {user.bandwidthMeter + ' %'}
          </Progress>
          <div className="user-detail-label-small">
            Available / Max &nbsp; &nbsp; &nbsp;   {user.bandwidthStr}
          </div>
        </Col>
        <UncontrolledTooltip placement="left" target="TooltipBandwidth" styleName="tooltip">
          <p>
            Bandwidth needs to be staked (with XFS coins)
          </p>
          <p>
            for viewing the property.
          </p>
        </UncontrolledTooltip>
        </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  </div>
)

export default UserInfo