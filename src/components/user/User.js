import React from 'react'
import { 
  TabContent, TabPane, Nav, NavItem, NavLink, Card, 
  Button, CardTitle, CardText, 
  Row, Col, Container, Label
} from 'reactstrap'
import classnames from 'classnames'
import UserInfo from './UserInfo'
import ManageRam from './ManageRam'

export const USERTAB = {
  INFO: '1',
  RESOURCE: '2',
  SEND: '3',
  RECEIVE: '4',
  ACTIVITY: '5'
}

export const User = ({
  user,
  activeTab,
  toggleTab,

  showModalDialog,
  toggleModalDialog
}) => (
  <div>
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.INFO })}
          onClick={() => { toggleTab(USERTAB.INFO); }}
        >
					<Button>Information</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.SEND })}
          onClick={() => { toggleTab(USERTAB.SEND); }}
        >
          <Button>Send</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.ACTIVITY })}
          onClick={() => { toggleTab(USERTAB.ACTIVITY); }}
        >
          <Button>Activity</Button>
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={activeTab}>
      <TabPane tabId={USERTAB.INFO}>
        <UserInfo
          user={user}
          toggleModalDialog={toggleModalDialog}
        />
        <ManageRam
          showModalDialog={showModalDialog}
          toggleModalDialog={toggleModalDialog}
          
        />
      </TabPane>
      <TabPane tabId={USERTAB.SEND}>
      </TabPane>
      <TabPane tabId={USERTAB.ACTIVITY}>
      </TabPane>
    </TabContent>
  </div>
)