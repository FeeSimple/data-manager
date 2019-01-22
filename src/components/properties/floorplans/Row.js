import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'

export default props => {
  const { floorplan, property, onDelete } = props
  return (
    <tr role='row' className='even'>
      <td>
        <input type='checkbox' />
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
        <button
          className='table-del'
          onClick={e => onDelete(property.id, floorplan.id)}
        >
          <img src={IconDelete} alt='' />
        </button>
      </td>
      <td>
        <Link to={`/`} className='table-del'>
          <img src={IconDelete} alt='' />
        </Link>
      </td>
    </tr>
  )
}
