import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Item from './Item'
import ItemEmpty from './ItemEmpty'

export default function (props) {
  const { properties, showTable, images } = props
  return (
    <Container>
      <Row>
        <Col>
          <ul className='properties-ul'>
            {showTable ? (
              Object.keys(properties).map((id, index) => {
                const property = properties[id]
                return ( property &&
                  <li key={id}>
                    <Item property={property} image={ images[index]} />
                  </li>
                )
              })
            ) : (
              <li key={0}>
                <ItemEmpty />
              </li>
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
