import React from 'react'
import Background from '../../img/300x300.png'

export default function (props) {
  const { property } = props
  return (
    <div className="card panel-fs">
      <div className="card-header text-center">{property.name}</div>
      <div className="card-body">
        <div className="panel-fs-div" style={{backgroundImage: `url(${Background})`}}></div>
        <div className="ms-row">
          <div className="ms-col">
            <div className="panel-fs-footer"> <a href="" className="btn btn-base">Floor Plans</a>
              <a href="" className="btn btn-base">Units</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}