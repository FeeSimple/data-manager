import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'

export default props => {
  const { unit, property } = props
  return (
    <tr role='row' className='even'>
      <td>
        <input type='checkbox' />
      </td>
      <td>{unit.id}</td>
      <td>{unit.name}</td>
      <td>
        {unit.bedrooms} beds / {unit.bathrooms} baths
      </td>
      <td>
        {unit.sq_ft_min} - {unit.sq_ft_max}
      </td>
      <td>
        ${unit.rent_min} - ${unit.rent_max}
      </td>
      <td>{unit.status}</td>
      <td>{new Date(parseInt(unit.date_available)).toLocaleDateString()}</td>
      <td>Term</td>
      <td>
        <Link to={`/${property.id}/unit/${unit.id}`} className='table-edit'>
          <img src={IconEditBlue} alt='' />
        </Link>
      </td>
      <td>
        <Link to={`/`} className='table-del'>
          <img src={IconDelete} alt='' />
        </Link>
      </td>
    </tr>
  )
}
