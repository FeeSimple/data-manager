import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'
import IconFinderEye from '../../../img/iconfinder_eye.png'

export default props => {
  const { unit, property, onChange, handleToggle } = props
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
        {
          unit.sq_ft_min === unit.sq_ft_max ? 
            unit.sq_ft_min : 
              unit.sq_ft_min === 0 ? 
                unit.sq_ft_max : 
                  unit.sq_ft_min.toString() + ' - ' + unit.sq_ft_max.toString()
        }  
      </td>
      <td>
        {
          unit.rent_min === unit.rent_max ? 
            '$' + unit.rent_min.toString() :
              unit.rent_min === 0 ? 
                '$' + unit.rent_max.toString() :
                  '$' + unit.rent_min.toString() + ' - ' + '$' + unit.rent_max.toString()
        }  
      </td>
      <td>{unit.status}</td>
      <td>{unit.date_available}</td>
      <td>
        <Link to={`/${property.id}/unit/${unit.id}/termprice`}>
          <img
            src={IconFinderEye}
            alt='icon-finder'
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
          onClick={e => handleToggle(property.id, unit.id, unit.name)}
        >
          <img src={IconDelete} alt='' />
        </button>
      </td>
    </tr>
  )
}
