import React from 'react'
import { 
  TabContent, TabPane, Nav, NavItem, NavLink, Card, 
  Button, CardTitle, CardText, 
  Row, Col, Container, Label
} from 'reactstrap'
import classnames from 'classnames'
import UserGeneral from './UserGeneral'
import UserResource from './UserResource'

export const USERTAB = {
  GENERAL: '1',
  RESOURCE: '2',
  SEND: '3',
  RECEIVE: '4',
  ACTIVITY: '5'
}

export const User = ({
  user,
  activeTab,
  toggle
}) => (
  <div>
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.GENERAL })}
          onClick={() => { toggle(USERTAB.GENERAL); }}
        >
					<Button>General</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.RESOURCE })}
          onClick={() => { toggle(USERTAB.RESOURCE); }}
        >
          <Button>Resource Management</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.SEND })}
          onClick={() => { toggle(USERTAB.SEND); }}
        >
          <Button>Send</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.RECEIVE })}
          onClick={() => { toggle(USERTAB.RECEIVE); }}
        >
          <Button>Receive</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.ACTIVITY })}
          onClick={() => { toggle(USERTAB.ACTIVITY); }}
        >
          <Button>Activity</Button>
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <UserGeneral
          user={user}
        />
      </TabPane>
      <TabPane tabId="2">
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  </div>
)