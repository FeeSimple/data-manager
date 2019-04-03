import React from 'react'
import UserActivity from './UserActivity'

import ManageRamModal from './modals/ManageRamModal'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const USERTAB = {
  INFO: '1',
  RESOURCE: '2',
  SEND: '3',
  RECEIVE: '4',
  ACTIVITY: '5'
}

export const User = ({
  user,
  showModalRam,
  handleToggleModalRam,
  handleManageRam,
  isBuy,
  setBuy,
  setSell,
  isProcessing,
  resourceHandleErr,
  activityList,
  gettingActions
}) => (
  <div>
    <ul className='circular-bar'>
      <li>
        <div className='circular-text-container'>
          <h3>RAM AVAILABLE</h3>
          <h2>{user.ramStr && user.ramStr.split('/')[0]}</h2>
          <p>
            <span href='' onClick={handleToggleModalRam}>
              MANAGE RAM
            </span>
          </p>
          <ManageRamModal
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
          initialAnimation={true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
          <h3>CPU AVAILABLE</h3>
          <h2>{user.cpuMeter + ' %'}</h2>
          <p>
            <span>{user.cpuStr && user.cpuStr.split('/')[0]}</span>
          </p>
          <p>
            <span className='gray-text'>
              {user.cpuStr && user.cpuStr.split('/')[1]}
            </span>
          </p>
        </div>
        <CircularProgressbar
          percentage={user.cpuMeter}
          strokeWidth={4}
          initialAnimation={true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
          <h3>BANDWIDTH AVAILABLE</h3>
          <h2>{user.bandwidthMeter + ' %'}</h2>
          <p>
            <span>{user.bandwidthStr && user.bandwidthStr.split('/')[0]}</span>
          </p>
          <p>
            <span className='gray-text'>
              {user.bandwidthStr && user.bandwidthStr.split('/')[1]}
            </span>
          </p>
        </div>
        <CircularProgressbar
          percentage={user.bandwidthMeter}
          strokeWidth={4}
          initialAnimation={true}
        />
      </li>
    </ul>
    <div>
      <UserActivity
        activityList={activityList}
        gettingActions={gettingActions}
      />
    </div>
  </div>
)
