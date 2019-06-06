import React from 'react'
import UserActivity from './UserActivity'
import IconInfo from '../../img/info.svg'

import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const User = ({ user, activityList, gettingActions }) => (
  <div>
    <ul className='circular-bar'>
      <li>
        <div className='circular-text-container'>
          <h3>RAM AVAILABLE</h3>
          {user.ramMeter && <h2>{Number(user.ramMeter).toFixed(1) + '%'}</h2>}
          <div className='wallet-info'>
            <img src={IconInfo} alt='' />
            <div className='info-content'>
              <div className='ms-arrow_box'>
                <span>
                  {user.ramStr && user.ramStr.split('/')[0]} available
                </span>
                <span>{user.ramStr && user.ramStr.split('/')[1]} total</span>
              </div>
            </div>
          </div>
        </div>
        <CircularProgressbar
          percentage={Number(user.ramMeter).toFixed(1)}
          strokeWidth={4}
          initialAnimation={true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
          <h3>CPU AVAILABLE</h3>
          {user.cpuMeter && <h2>{Number(user.cpuMeter).toFixed(1) + '%'}</h2>}
          <div className='wallet-info'>
            <img src={IconInfo} alt='' />
            <div className='info-content'>
              <div className='ms-arrow_box'>
                <span>
                  {user.cpuStr && user.cpuStr.split('/')[0]} available
                </span>
                <span>{user.cpuStr && user.cpuStr.split('/')[1]} total</span>
              </div>
            </div>
          </div>
        </div>
        <CircularProgressbar
          percentage={Number(user.cpuMeter).toFixed(1)}
          strokeWidth={4}
          initialAnimation={true}
        />
      </li>
      <li>
        <div className='circular-text-container'>
          <h3>NET AVAILABLE</h3>
          {user.bandwidthMeter && (
            <h2>{Number(user.bandwidthMeter).toFixed(1) + '%'}</h2>
          )}
          <div className='wallet-info'>
            <img src={IconInfo} alt='' />
            <div className='info-content'>
              <div className='ms-arrow_box'>
                <span>
                  {user.bandwidthStr && user.bandwidthStr.split('/')[0]}{' '}
                  spendable
                </span>
                <span>
                  {user.bandwidthStr && user.bandwidthStr.split('/')[1]} total
                </span>
              </div>
            </div>
          </div>
        </div>
        <CircularProgressbar
          percentage={Number(user.bandwidthMeter).toFixed(1)}
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
