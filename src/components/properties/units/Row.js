import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'
import IconFinderEye from '../../../img/iconfinder_eye.png'

export default props => {
  const { unit, property, onDelete, onChange, handleToggle } = props
  return (
    <tr role='row' className='even'>
      <td>
        <input type='checkbox' name={unit.id} onChange={onChange} />
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
      <td>
        <Link to={`/${property.id}/unit/${unit.id}/termprice`}>
          <img
            src={IconFinderEye}
            style={{ marginLeft: '24px', width: '27px', height: '27px' }}
          />
        </Link>
      </td>
      <td>
        <Link to={`/${property.id}/unit/${unit.id}`} className='table-edit'>
          <img src={IconEditBlue} alt='' />
        </Link>
      </td>
      <td>
        <button
          className='table-del'
          onClick={e => handleToggle(property.id, unit.id)}
        >
          <img src={IconDelete} alt='' />
        </button>
      </td>
    </tr>
  )
}
