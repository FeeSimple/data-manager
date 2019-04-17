import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IconAdd from '../../../img/icon-plus-sq.svg'
import Grid from './Grid'
import { Col, Row } from 'reactstrap'
import { FSMGRCONTRACT, PROPERTY, PROPERTYIMG } from '../../../utils/consts'
import Background from '../../../img/property-no-image.svg'

class GridContainer extends Component {
  state = {
    images: []
  }

  async componentDidMount () {
    const { properties, eosClient, accountData } = this.props

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      accountData.active,
      PROPERTYIMG
    )

    console.log('GridContainer - get table PROPERTYIMG:', rows)

    let images = []
    Object.keys(properties).map(id => {
      let imgIpfsAddrListFromTable = rows
      .filter(row => row.property_id === Number(id))
      .map(row => row.ipfs_address)

      if (!imgIpfsAddrListFromTable[0]) {
        images.push(Background)
      } else {
        images.push(`https://ipfs.infura.io:5001/api/v0/cat?arg=${
        imgIpfsAddrListFromTable[0]}&stream-channels=true`) // choose the first image for background
      }
    })

    console.log('GridContainer - images:', images)

    this.setState({ images })
  }

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
                <span className='float-right'>
                  <Link to='/new'>
                    <img src={IconAdd} alt='' />
                  </Link>
                </span>
              </Col>
            </Row>
          </div>
        </div>
        <Grid properties={properties} showTable={showTable} images={this.state.images}/>
      </div>
    )
  }
}

function mapStateToProps ({ properties, scatter, eosjs, eosClient, accountData }) {
  return { properties, scatter, eosjs, eosClient, accountData }
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(GridContainer)
)
