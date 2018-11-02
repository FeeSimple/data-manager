import React from 'react'
import { 
  TabContent, TabPane, Nav, NavItem, NavLink, Card, 
  Button, CardTitle, CardText, 
  Row, Col, Container, Label
} from 'reactstrap'
import classnames from 'classnames'
import UserAccount from './UserAccount'
import UserResource from './UserResource'

const UserGeneral = ({
  user,
  activeTab,
  toggle
}) => (
  <div>
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '1' })}
          onClick={() => { toggle('1'); }}
        >
					Account
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '2' })}
          onClick={() => { toggle('2'); }}
        >
          Resource Management
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '3' })}
          onClick={() => { toggle('3'); }}
        >
          Send
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '4' })}
          onClick={() => { toggle('4'); }}
        >
          Receive
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '5' })}
          onClick={() => { toggle('5'); }}
        >
          Activity
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <UserAccount
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

export default UserGeneral