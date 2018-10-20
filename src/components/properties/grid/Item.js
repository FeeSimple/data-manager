import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../../../img/property-no-image.svg'

export default function (props) {
  const { property } = props
  return (
    <div className="card panel-fs">
      <div className="card-header text-center"><Link to={`/${property.id}`}>{property.name}</Link></div>
      <div className="card-body">
        <Link to={`/${property.id}`}>
          <div
            className="panel-fs-div property-grid-item"
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}/>
        </Link>
        <div className="ms-row">
          <div className="ms-col">
            <div className="panel-fs-footer">
              <Link to="/" className="btn btn-base">Floor Plans</Link>
              <Link to="/" className="btn btn-base">Units</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}