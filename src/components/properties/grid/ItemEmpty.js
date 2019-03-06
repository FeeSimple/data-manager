import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../../../img/property-no-image.svg'
import IconAdd from '../../../img/icon-add.svg'

export default function (props) {
  return (
    <div className='card panel-fs'>
      <div className='card-header text-center'>
        <Link to='/new'>
          <img src={IconAdd} alt='' />
        </Link>
      </div>
      <div className='card-body'>
        <div
          className='panel-fs-div property-grid-item'
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
        <div className='ms-row'>
          <div className='ms-col'>
            <div className='panel-fs-footer'>
              <div className='no-property-txt'>
                You have no properties.
              </div>
              <div className='no-property-txt'> 
                Would you like to add one?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
