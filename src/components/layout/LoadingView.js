import React from 'react'
import Spinner from 'react-spinkit'

export default function LoadingView () {
  return (
    <div className='justify-content-center align-items-center'>
      <Spinner
        className='justify-content-center align-items-center mx-auto'
        name='three-bounce'
        color='#00B1EF'
        style={{
          width: 100,
          margin: 250
        }}
      />
    </div>
  )
}
