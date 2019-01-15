import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import IconEditGrey from '../../../img/icon-edit-grey.svg'
import IconAdd from '../../../img/icon-add.svg'
import UnitRow from './Row'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import IconFinderEye from '../../../img/iconfinder_eye.png'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

var property_id;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
  },
  {
    dataField: 'unit',
    text: 'Unit',
    sort: true
  }, 
  {
    dataField: 'type',
    text: 'Type',
    sort: true
  },
  {
    dataField: 'sq_ft',
    text: 'Sq, Ft.',
    sort: true
  },
  {
    dataField: 'rent',
    text: 'Rent',
    sort: true
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true
  },
  {
    dataField: 'date_available',
    text: 'Date Available',
    sort: true
  },
  {
    dataField: 'term_pricing',
    text: 'Term Pricing',
    formatter: (cellContent, row) => {
      return (
        <Link to={`/${row.df1}/unit/${row.id}/termprice`}>
          <img
            src={IconFinderEye}
            style={{ marginLeft: '24px', width: '27px', height: '27px' }}
          />
        </Link>
      )
    }
  },
  {
    dataField: 'df1',
    text: '',
    isDummyField: true,
    formatter: (cellContent, row) => {
      return (
        <Link to={`/${row.df1}/unit/${row.id}`} className='table-edit'>
          <img src={IconEditBlue} alt='' />
        </Link>
      )
    }
  },
  {
    dataField: 'df2',
    text: '',
    isDummyField: true,
    formatter: (cellContent, row) => {
      return (
        <Link to={`/${row.df2}/unit/${row.id}`} className='table-edit'>
          <img src={IconDelete} alt='' />
        </Link>
      )
    }
  }
]

const defaultSorted = [{
  dataField: 'unit',
  order: 'asc'
}]

const data = [
  {
    id: 1,
    unit: 'TV',
    type: 1000,
    sq_ft: 0,
    rent: 0,
    status: 0,
    date_available: 0,
    term_pricing: 0,
    df1: 1,
    df2: 1
  }
]

export default props => {
  const { property } = props
  return (
    <div>
      <div className='top-bar'>
        <Container>
          <Row>
            <Col>
              <h3 className='float-left'>
                {property.name}{' '}
                <Link to={`/${props.propertyId}/edit`}>
                  <img src={IconEditGrey} alt='' />
                </Link>
              </h3>
              <h3 className='float-right'>
                <Link to={`/${props.propertyId}/unit/new`}>
                  <img src={IconAdd} alt='' />
                  <span className='hide-xs'>New Unit</span>
                </Link>
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
      <br />
      <Container>
        <BootstrapTable
          keyField="id"
          data={ data }
          columns={ columns }
          defaultSortDirection="asc"
        />
      </Container>
    </div>
  )
}
