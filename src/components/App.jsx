import React from 'react'
import { Container } from 'reactstrap'
import Properties from './Properties'
import Navbar from './Navbar'

export default function App () {
  return (
    <div>
      <Navbar />
      <Container>
        <Properties />
      </Container>
    </div>
  )
}
