import React from 'react'
import { Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import IconEditGrey from '../../../img/icon-edit-grey.svg'
import IconAdd from '../../../img/icon-add.svg'

export default (props) => (
  <div>
    <div className="top-bar">
      <Container>
        <Row>
          <div class="col-12 col-md-4 m-xs-b-10">
            <h3>Property Name{' '}
              <Link to={`/${props.propertyId}/edit`}><img src={IconEditGrey} alt=""/></Link>
            </h3>
          </div>
          <div class="col-10 col-md-4 tc tl-xs">
            <a href="" class="btn btn-base-o prop-btn">Floor Plan</a>
            <a href="" class="btn btn-gray-o prop-btn">Units</a>
          </div>
          <div class="col-2 col-md-4">
            <h3 class="float-right"><a href=""><img src={IconAdd} alt=""/><span class="hide-xs">New Floor Plan</span></a></h3>
          </div>
        </Row>
      </Container>
    </div>
    <br />
    <Container>
      <h3>Hello Floorplans</h3>
    </Container>
  </div>
)

