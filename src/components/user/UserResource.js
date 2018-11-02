import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { 
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button 
} from 'reactstrap'

const UserResource = ({
  user
}) => (
  <div>
    <Container>
      <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Container>
  </div>
)

export default UserResource