import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import PropertyMedia from './PropertyMedia'

export default function (props) {
  const { properties } = props
  return (
    <Container>
      <Row>
        <Col>
          <ul className="properties-ul">
            {Object.keys(properties).map(id => {
              const property = properties[id]
              return <li key={id}><PropertyMedia property={property} /></li>
            })}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}