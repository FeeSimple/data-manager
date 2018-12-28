import React from 'react'
import { UncontrolledAlert } from 'reactstrap'

export const ErrorPopup = ({ errMsg }) => (
  <div className='justify-content-center align-items-center'>
    <UncontrolledAlert color='danger'>{errMsg}</UncontrolledAlert>
  </div>
)
