import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import Spinner from 'react-spinkit'
import IconAdd from '../../../img/icon-add.svg'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import IconAddSqr from '../../../img/icon-plus-sq.svg'

function noTermPriceTxt (column, colIndex) {
  const hrefLink = `${window.location.href}/new`
  return (
    <span style={{ fontSize: '11px' }}>
      This_unit_has_no_term_prices. Would_you_like_to_<a href={hrefLink}>add</a>
      _one?
    </span>
  )
}

const NoDataIndication = () => {
  const hrefLink = `${window.location.href}/new`
  return (
    <div className='w-100 text-center'>
      <span>
        This unit has no term prices. Would you like to{' '}
        <a href={hrefLink}>add</a> one?
      </span>
    </div>
  )
}

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
      sort: true
    },
    {
      dataField: 'end_date',
      text: 'End Date',
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
        <div className='container-fluid'>
          <Row>
            <div className='col-7 col-md-8'>
              <h3 className='float-left'>Term Pricing</h3>
            </div>
            <div className='col-5 col-md-4'>
              <span className='float-right'>
                <Link to={`/${propertyId}/unit/${unit.id}/termprice/new`}>
                  <img src={IconAddSqr} alt='' />
                </Link>
              </span>
            </div>
          </Row>
        </div>
      </div>
      <Container>
        <Row>
          <Col sm='12'>
            <ToolkitProvider
              keyField='id'
              data={data}
              // columns={showFooter ? columnsFooter : columns}
              columns={columns}
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
                    noDataIndication={
                      showFooter ? (
                        () => <NoDataIndication />
                      ) : (
                        <Spinner color='#00B1EF' fadeIn='none' />
                      )
                    }
                    pagination={paginationFactory()}
                  />
                </React.Fragment>
              )}
            </ToolkitProvider>
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </div>
  )
}
