import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Storage from '../../layout/Storage'
import IconAdd from '../../../img/icon-add.svg'
import Grid from './Grid'
import { Col, Row, Container } from 'reactstrap'

class GridContainer extends Component {
  render () {
    const { properties } = this.props

    const showTable = Object.keys(properties).length !== 0

    return (
      <div>
        <div className='top-bar'>
          <div className='container-fluid'>
            <Row>
              <Col>
                <h3 className='float-left'>Properties</h3>
              </Col>
              <Col>
                <h3 className='float-right'>
                  <Link to='/new'>
                    <img src={IconAdd} alt='' />
                    <span className='hide-xs'>New Property</span>
                  </Link>
                </h3>
              </Col>
            </Row>
          </div>
        </div>
        <Grid properties={properties} showTable={showTable} />
      </div>
    )
  }
}

function mapStateToProps ({ properties, scatter, eosjs }) {
  return { properties, scatter, eosjs }
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(GridContainer)
)
