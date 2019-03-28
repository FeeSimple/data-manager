import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import classnames from 'classnames'
import UserInfo from './UserInfo'
import ManageRam from './ManageRam'
import ManageCpuBw from './ManageCpuBw'
import UserSend from './UserSend'
import UserActivity from './UserActivity'

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

  showModalRam,
  handleToggleModalRam,
  handleManageRam,
  isBuy,
  setBuy,
  setSell,

  showModalCpuBw,
  handleToggleModalCpu,
  handleToggleModalBw,
  handleToggleModalCpuBw,
  isCpu,
  isStake,
  setStake,
  setUnstake,
  handleManageCpuBw,

  isProcessing,
  resourceHandleErr,

  handleUserSend,
  userSendErr,

  activityList,
  gettingActions
}) => (
  <div>
    <ul className='circular-bar'>
      <li>
        <div className='circular-text-container'>
          <h3>RAM AVAILABLE</h3>
          <h2>100.67 KiB</h2>
          <p><a href=''>MANAGE RAM</a></p>
        </div>
        <CircularProgressbar
          percentage={65}
          strokeWidth={4}
          initialAnimation= {true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
          <h3>RAM AVAILABLE</h3>
          <h2>75.4%</h2>
          <p><span>1,582,254.847 s</span></p>
          <p><span className='gray-text'>1,582,254.847 s</span></p>
        </div>
        <CircularProgressbar
          percentage={75}
          strokeWidth={4}
          initialAnimation= {true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
            <h3>BANDWIDTH AVAILABLE</h3>
            <h2>95%</h2>
            <p><span>125 GB</span></p>
            <p><span className='gray-text'>124 GB</span></p>
          </div>
          <CircularProgressbar
            percentage={95}
            strokeWidth={4}
            initialAnimation= {true}  
          />
      </li>
  </ul>
    {/*
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.INFO })}
          onClick={() => {
            toggleTab(USERTAB.INFO)
          }}
        >
          <Button>Information</Button>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === USERTAB.SEND })}
          onClick={() => {
            toggleTab(USERTAB.SEND)
          }}
        >
          <Button>Send</Button>
        </NavLink>
      </NavItem>
    </Nav>
    */}
    <TabContent activeTab={activeTab}>
      <TabPane tabId={USERTAB.INFO}>
        {/*
        <br />
        <UserInfo
          user={user}
          handleToggleModalRam={handleToggleModalRam}
          handleToggleModalCpu={handleToggleModalCpu}
          handleToggleModalBw={handleToggleModalBw}
        />
        */}
        <UserActivity
          activityList={activityList}
          gettingActions={gettingActions}
        />
        
        <ManageRam
          showModalRam={showModalRam}
          handleToggleModalRam={handleToggleModalRam}
          handleManageRam={handleManageRam}
          isBuy={isBuy}
          setBuy={setBuy}
          setSell={setSell}
          isProcessing={isProcessing}
          resourceHandleErr={resourceHandleErr}
        />
        

        <ManageCpuBw
          showModalCpuBw={showModalCpuBw}
          handleToggleModalCpuBw={handleToggleModalCpuBw}
          isProcessing={isProcessing}
          resourceHandleErr={resourceHandleErr}
          isCpu={isCpu}
          isStake={isStake}
          setStake={setStake}
          setUnstake={setUnstake}
          handleManageCpuBw={handleManageCpuBw}
        />
      </TabPane>
      <TabPane tabId={USERTAB.SEND}>
        <br />
        <UserSend
          user={user}
          handleUserSend={handleUserSend}
          userSendErr={userSendErr}
          isProcessing={isProcessing}
        />
      </TabPane>
    </TabContent>
  </div>
)
