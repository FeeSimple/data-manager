import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'

export default props => {
  const { unit, termprice, propertyId, onDelete, onChange } = props
  return (
    <tr role='row' className='even'>
      <td>
        <input type='checkbox' name={termprice.id} onChange={onChange} />
      </td>
      <td>{termprice.id}</td>
      <td>{termprice.rent}</td>
      <td> {termprice.term}</td>
      <td>
        {' '}
        {new Date(parseInt(termprice.start_date, 10)).toLocaleDateString()}
      </td>
      <td>
        {' '}
        {new Date(parseInt(termprice.end_date, 10)).toLocaleDateString()}
      </td>
      <td>
        <Link
          to={`/${propertyId}/unit/${unit.id}/termprice/${termprice.id}`}
          className='table-edit'
        >
          <img src={IconEditBlue} alt='' />
        </Link>
      </td>
      <td>
        <button
          className='table-del'
          onClick={e => onDelete(propertyId, unit.id, termprice.id)}
        >
          <img src={IconDelete} alt='' />
        </button>
      </td>
    </tr>
  )
}
