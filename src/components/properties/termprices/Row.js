import React from 'react'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import { Link } from 'react-router-dom'

export default props => {
  const { unit, termprice, propertyId } = props
  return (
    <tr role='row' className='even'>
      <td>
        <input type='checkbox' />
      </td>
      <td>{termprice.term}</td>
      <td> {termprice.rent}</td>
      <td> {new Date(parseInt(termprice.start_date)).toLocaleDateString()}</td>
      <td> {new Date(parseInt(termprice.end_date)).toLocaleDateString()}</td>
      <td>
        <Link
          to={`/${propertyId}/unit/${unit.id}/termprice/${termprice.id}`}
          className='table-edit'
        >
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
