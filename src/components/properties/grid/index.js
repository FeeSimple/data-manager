import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IconAdd from '../../../img/icon-add.svg'
import Grid from './Grid'
import { Col, Row, Container } from 'reactstrap'
import { setOpResult } from '../../../actions'

class GridContainer extends Component {
  render () {
    const { properties, setOpResult } = this.props

    const noProperties = Object.keys(properties).length === 0
    const showAlert = noProperties

    if (showAlert) {
      setOpResult({
        show: true,
        title: '',
        text: 'No properties yet. Please add a property',
        type: 'info'
      })
    }

    const showTable = !noProperties

    return (
      <div>
        <div className='top-bar'>
          <Container>
            <Row>
              <Col>
                <h3 className='float-left'>Properties</h3>
                <h3 className='float-right'>
                  <Link to='/new'>
                    <img src={IconAdd} alt='' />
                    <span className='hide-xs'>New Property</span>
                  </Link>
                </h3>
              </Col>
            </Row>
          </Container>
        </div>
        {showTable && (
          <Container>
            <Grid properties={properties} />
          </Container>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ properties, scatter, eosjs }) {
  return { properties, scatter, eosjs }
}

export default withRouter(
  connect(mapStateToProps, { setOpResult })(GridContainer)
)
