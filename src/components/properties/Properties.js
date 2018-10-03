import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IconAdd from '../../img/icon-add.svg'
import PropertyGrid from './PropertyGrid'
import {
  Col,
  Row,
  Container
} from 'reactstrap'

class Properties extends Component {
  render() {
    const { properties } = this.props
    return (
      <div>
        <div className="top-bar">
          <Container>
            <Row>
              <Col>
                <h3 className="float-left">Properties</h3>
                <h3 className="float-right">
                  <Link to='/new'>
                    <img src={IconAdd} alt=""/>
                    <span className="hide-xs">
                      New Property
                    </span>
                  </Link>
                </h3>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <PropertyGrid properties={properties}/>
        </Container>
      </div>
    )
  }

}

function mapStateToProps({ properties, scatter, eosjs }){
  return { properties, scatter, eosjs }
}

export default withRouter(connect(
  mapStateToProps
)(Properties))
