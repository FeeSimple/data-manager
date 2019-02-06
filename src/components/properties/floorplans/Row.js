import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'

export default props => {
  const { floorplan, property, onChange, handleToggle } = props
  return (
    <tr role='row' className='even'>
      <td>
        <input type='checkbox' name={floorplan.id} onChange={onChange} />
      </td>
      <td>{floorplan.id}</td>
      <td>{floorplan.name}</td>
      <td>
        {floorplan.bedrooms} beds / {floorplan.bathrooms} baths
      </td>
      <td>
        {floorplan.sq_ft_min} - {floorplan.sq_ft_max}
      </td>
      <td>
        ${floorplan.rent_min} - ${floorplan.rent_max}
      </td>
      <td>{property.unit_count}</td>
      <td>
        <Link
          to={`/${property.id}/floorplan/${floorplan.id}`}
          className='table-edit'
        >
          <img src={IconEditBlue} alt='' />
        </Link>
      </td>
      <td>
        <button
          className='table-del'
          onClick={e => handleToggle(property.id, floorplan.id)}
        >
          <img src={IconDelete} alt='' />
        </button>
      </td>
    </tr>
  )
}
