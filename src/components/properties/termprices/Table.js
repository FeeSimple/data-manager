import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import Storage from '../../layout/Storage'
import IconAdd from '../../../img/icon-add.svg'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'

function noTermPriceTxt(column, colIndex) {
  return (
    <span style={{fontSize: '11px'}}>
    This_unit_has_no_term_prices. 
    Would_you_like_to_<a href='termprice/new'>add</a>_one?
    </span>
  );
}

const footerBgColor = 'rgba(222, 222, 223, 0.75)'

export default props => {
  const {
    propertyId,
    unit,
    onChange,
    handleToggle,
    deleteBulkDisabled,
    showFooter
  } = props
  const { SearchBar } = Search
  const data = Object.values(unit.termprices)
  const columnsFooter = [
    {
      dataField: 'checkboxField',
      text: '',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <input type='checkbox' name={row.id} onChange={onChange} />
      ),
      headerStyle: { width: 40 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      headerStyle: { width: 60 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'rent',
      text: 'Rent',
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'term',
      text: 'Term',
      sort: true,
      footer: ``,
      footerStyle: {
        backgroundColor: footerBgColor,
        colSpan: '50'
      },
      footerFormatter: noTermPriceTxt
    },
    {
      dataField: 'start_date',
      text: 'Start Date',
      formatter: cellContent =>
        `${new Date(parseInt(cellContent, 10)).toLocaleDateString()}`,
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'end_date',
      text: 'End Date',
      formatter: cellContent =>
        `${new Date(parseInt(cellContent, 10)).toLocaleDateString()}`,
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'action_buttons_dummy_field',
      text: '',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <div>
          <Link
            to={`/${propertyId}/unit/${unit.id}/termprice/${row.id}`}
            className='table-edit mr-2'
          >
            <img src={IconEditBlue} alt='Edit Entry' />
          </Link>
          <img
            src={IconDelete}
            className='c-pointer'
            height='20'
            alt='Delete Entry'
            onClick={e => handleToggle(propertyId, unit.id, row.id)}
          />
        </div>
      ),
      headerStyle: { width: 70 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    }
  ]

  const columns = [
    {
      dataField: 'checkboxField',
      text: '',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <input type='checkbox' name={row.id} onChange={onChange} />
      ),
      headerStyle: { width: 40 }
    },
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      headerStyle: { width: 60 }
    },
    {
      dataField: 'rent',
      text: 'Rent',
      sort: true
    },
    {
      dataField: 'term',
      text: 'Term',
      sort: true
    },
    {
      dataField: 'start_date',
      text: 'Start Date',
      formatter: cellContent =>
        `${new Date(parseInt(cellContent, 10)).toLocaleDateString()}`,
      sort: true
    },
    {
      dataField: 'end_date',
      text: 'End Date',
      formatter: cellContent =>
        `${new Date(parseInt(cellContent, 10)).toLocaleDateString()}`,
      sort: true
    },
    {
      dataField: 'action_buttons_dummy_field',
      text: '',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <div>
          <Link
            to={`/${propertyId}/unit/${unit.id}/termprice/${row.id}`}
            className='table-edit mr-2'
          >
            <img src={IconEditBlue} alt='Edit Entry' />
          </Link>
          <img
            src={IconDelete}
            className='c-pointer'
            height='20'
            alt='Delete Entry'
            onClick={e => handleToggle(propertyId, unit.id, row.id)}
          />
        </div>
      ),
      headerStyle: { width: 70 }
    }
  ]

  return (
    <div>
      <div className='top-bar'>
        <Container>
          <Row>
            <Col>
              <h3 className='float-left'>Term Pricing</h3>
            </Col>
            <Col>
              <Storage />
            </Col>
          </Row>
        </Container>
      </div>
      <div className='top-bar whitebar'>
        <Container>
          <Row>
            <Col>
              <h3 className='float-right'>
                <Link to={`/${propertyId}/unit/${unit.id}/termprice/new`}>
                  <img src={IconAdd} alt='' />
                  <span>New Term Price</span>
                </Link>
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
          <Row>
            <Col sm='12'>
              <Button
                size='sm'
                outline
                color='red'
                className='tbl-btn-close'
                disabled={deleteBulkDisabled}
                onClick={e => handleToggle(propertyId, unit.id)}
              >
                Delete Checked
              </Button>
              <ToolkitProvider
                keyField='id'
                data={data}
                columns={showFooter? columnsFooter : columns}
                search={{ searchFormatted: true }}
                bootstrap4
              >
                {props => (
                  <React.Fragment>
                    <SearchBar
                      {...props.searchProps}
                      className='mb-3 tbl-search-input'
                    />
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory()}
                    />
                  </React.Fragment>
                )}
              </ToolkitProvider>
            </Col>
          </Row>
        </Container>
    </div>
  )
}
