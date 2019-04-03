import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import classnames from 'classnames'
import UserInfo from './UserInfo'
import ManageRam from './ManageRam'
import ManageCpuBw from './ManageCpuBw'
import UserSend from './UserSend'
import UserActivity from './UserActivity'

import ManageRamModal from './modals/ManageRamModal'
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
          <h2>{user.ramStr && user.ramStr.split('/')[0]}</h2>
          <p><span href="" onClick={handleToggleModalRam}>MANAGE RAM</span></p>
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
        </div>
        <CircularProgressbar
          percentage={user.ramMeter}
          strokeWidth={4}
          initialAnimation= {true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
          <h3>CPU AVAILABLE</h3>
          <h2>{user.cpuMeter + ' %'}</h2>
          <p><span>{user.cpuStr && user.cpuStr.split('/')[0]}</span></p>
          <p><span className='gray-text'>{user.cpuStr && user.cpuStr.split('/')[1]}</span></p>
        </div>
        <CircularProgressbar
          percentage={user.cpuMeter}
          strokeWidth={4}
          initialAnimation= {true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
            <h3>BANDWIDTH AVAILABLE</h3>
            <h2>{user.bandwidthMeter + ' %'}</h2>
            <p><span>{user.bandwidthStr && user.bandwidthStr.split('/')[0]}</span></p>
            <p><span className='gray-text'>{user.bandwidthStr && user.bandwidthStr.split('/')[1]}</span></p>
          </div>
          <CircularProgressbar
            percentage={user.bandwidthMeter}
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
