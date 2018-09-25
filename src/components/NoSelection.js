import React from 'react'
import { Row } from 'react-bootstrap'

export default function NoSelection () {
  return (
    <div className='h-100'>
      <Row className='h-100 justify-content-center align-items-center'>
        <h4>Start by creating a new property or selecting an item on the left.</h4>
      </Row>
    </div>
  )
}
