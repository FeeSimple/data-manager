import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'

export default (props) => {
  const { floorplan } = props
  return (
    <tr role="row" className="even">
      <td><input type="checkbox" /></td>
      <td>{floorplan.id}</td>
      <td>{floorplan.name}</td>
      <td>{floorplan.bedrooms} beds / {floorplan.baths} baths</td>
      <td>{floorplan.sqftMin} - {floorplan.sqftMax}</td>
      <td>${floorplan.rentMin} - ${floorplan.rentMax}</td>
      <td>{floorplan.numUnits}</td>
      <td><Link to="/" className="table-edit"><img src={IconEditBlue} alt="" /></Link></td>
      <td><Link to="/" className="table-del"><img src={IconDelete} alt="" /></Link></td>
    </tr>
  )
}