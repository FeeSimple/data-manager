import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Item from './Item'

export default function (props) {
  const { properties } = props
  return (
    <Container>
      <Row>
        <Col>
          <ul className='properties-ul'>
            {Object.keys(properties).map(id => {
              const property = properties[id]
              return (
                <li key={id}>
                  <Item property={property} />
                </li>
              )
            })}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
