import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../../../img/property-no-image.svg'
import IconAdd from '../../../img/icon-add.svg'

export default function (props) {
  return (
    <div className='card panel-fs'>
			<a href='/new'>
      	<div className='card-body text-center p-5'>
          	<img class='mb-3' src={IconAdd} alt='' />
        	<div className='ms-row'>
          	<div className='ms-col'>
            	<div className='panel-fs-footer'>
              	<div className='no-property-txt'>You have no properties yet.</div>
              	<div className='no-property-txt'>Would you like to add one?</div>
            	</div>
          	</div>
        	</div>
      	</div>
			</a>
    </div>
  )
}
