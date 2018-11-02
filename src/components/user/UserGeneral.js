import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import UserAccount from './UserAccount'
import UserResource from './UserResource'

const UserGeneral = ({
  user
}) => (
  <div>
    <div className="top-bar">
      <Container>
        <Row>
          <Col>
            <span className="float-left">
              <Link to="/account" className="btn btn-base-o prop-btn">Account</Link>
            </span>
          </Col>
          <Col>
            <span className="float-left">
              <Link to="/account/resrc" className="btn btn-base-o prop-btn">Resource Management</Link>
            </span>
          </Col>
          <Col>
            <span className="float-right">
              <Link to="/account/send" className="btn btn-base-o prop-btn">Send</Link>
            </span>
          </Col>
          <Col>
            <span className="float-right">
              <Link to="/account/receive" className="btn btn-base-o prop-btn">Receive</Link>
            </span>
          </Col>
          <Col>
            <span className="float-right">
              <Link to="/account/activity" className="btn btn-base-o prop-btn">Activity</Link>
            </span>
          </Col>
        </Row>
      </Container>
    </div>
    <br />
    <div>
      <UserAccount
        user={user}
      />
    </div>
    <div className='hidden'>
      <UserResource
        user={user}
      />
    </div>
  </div>
)

export default UserGeneral