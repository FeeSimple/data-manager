import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import IconAdd from '../../../img/icon-add.svg'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconDelete from '../../../img/icon-delete.svg'
import IconFinderEye from '../../../img/iconfinder_eye.png'
import UnitRow from './Row'

function noUnitTxt (column, colIndex) {
  const hrefLink = `${window.location.href}/new`
  return (
    <span style={{ fontSize: '11px' }}>
      This_property_has_no_units. Would_you_like_to_<a href={hrefLink}>add</a>_one?
    </span>
  )
}

const footerBgColor = 'rgba(222, 222, 223, 0.75)'

export default props => {
  const {
    propertyId,
    property,
    onChange,
    handleToggle,
    deleteBulkDisabled,
    showFooter
  } = props
  const { SearchBar } = Search
  const data = Object.values(property.units)
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
      headerStyle: { width: 40 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'name',
      text: 'Unit',
      sort: true,
      headerStyle: { width: 60 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'bedrooms',
      text: 'Type',
      sort: true,
      formatter: (cellContent, row) =>
        `${row.bedrooms} beds / ${row.bathrooms} baths`,
      headerStyle: { width: 130 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'sq_ft_min',
      text: 'Sq. Ft.',
      formatter: (cellContent, row) => `${row.sq_ft_min} - ${row.sq_ft_max}`,
      sort: true,
      headerStyle: { width: 98 },
      footer: ``,
      footerStyle: {
        backgroundColor: footerBgColor,
        colSpan: '50'
      },
      footerFormatter: noUnitTxt
    },
    {
      dataField: 'rent_min',
      text: 'Rent',
      formatter: (cellContent, row) => `$${row.rent_min} - $${row.rent_max}`,
      sort: true,
      headerStyle: { width: 98 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerStyle: { width: 98 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'date_available',
      text: 'Date Available',
      formatter: (cellContent, row) =>
        `${new Date(parseInt(row.date_available, 10)).toLocaleDateString()}`,
      sort: true,
      headerStyle: { width: 150 },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'termPricingDummyField',
      text: 'Term Pricing',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <Link to={`/${property.id}/unit/${row.id}/termprice`}>
          <img
            src={IconFinderEye}
            alt='icon-finder'
            style={{ marginLeft: '24px', width: '27px', height: '27px' }}
          />
        </Link>
      ),
      headerStyle: { width: 150 },
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
            to={`/${property.id}/unit/${row.id}`}
            className='table-edit mr-2'
          >
            <img src={IconEditBlue} alt='Edit Entry' />
          </Link>
          <img
            src={IconDelete}
            className='c-pointer'
            height='20'
            alt='Delete Entry'
            onClick={e => handleToggle(property.id, row.id)}
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
      headerStyle: { width: 40 }
    },
    {
      dataField: 'name',
      text: 'Unit',
      sort: true,
      headerStyle: { width: 60 }
    },
    {
      dataField: 'bedrooms',
      text: 'Type',
      sort: true,
      formatter: (cellContent, row) =>
        `${row.bedrooms} beds / ${row.bathrooms} baths`,
      headerStyle: { width: 130 }
    },
    {
      dataField: 'sq_ft_min',
      text: 'Sq. Ft.',
      formatter: (cellContent, row) => `${row.sq_ft_min} - ${row.sq_ft_max}`,
      sort: true,
      headerStyle: { width: 98 }
    },
    {
      dataField: 'rent_min',
      text: 'Rent',
      formatter: (cellContent, row) => `$${row.rent_min} - $${row.rent_max}`,
      sort: true,
      headerStyle: { width: 98 }
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerStyle: { width: 98 }
    },
    {
      dataField: 'date_available',
      text: 'Date Available',
      formatter: (cellContent, row) =>
        `${new Date(parseInt(row.date_available, 10)).toLocaleDateString()}`,
      sort: true,
      headerStyle: { width: 150 }
    },
    {
      dataField: 'termPricingDummyField',
      text: 'Term Pricing',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <Link to={`/${property.id}/unit/${row.id}/termprice`}>
          <img
            src={IconFinderEye}
            alt='icon-finder'
            style={{ marginLeft: '24px', width: '27px', height: '27px' }}
          />
        </Link>
      ),
      headerStyle: { width: 150 }
    },
    {
      dataField: 'action_buttons_dummy_field',
      text: '',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <div>
          <Link
            to={`/${property.id}/unit/${row.id}`}
            className='table-edit mr-2'
          >
            <img src={IconEditBlue} alt='Edit Entry' />
          </Link>
          <img
            src={IconDelete}
            className='c-pointer'
            height='20'
            alt='Delete Entry'
            onClick={e => handleToggle(property.id, row.id)}
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
              <h3 className='float-left'>{property.name}</h3>
            </div>
            <div className='col-5 col-md-4'>
              <h3 className='float-right'>
                  <Link to={`/${props.propertyId}/floorplan/new`}>
                    <img src={IconAdd} alt='' />
                    F<span className='hide-xs'>loor</span> 
                  </Link>  
                  <Link to={`/${props.propertyId}/unit/new`}>
                    <img src={IconAdd} alt='' />
                    U<span className='hide-xs'>nit</span>
                  </Link>
                </h3>
            </div>
          </Row>
        </div>
      </div>
      <Container>
        <Row>
          <Col sm='12'>
            <div className='floor-btns'>
                <Link
                  to={`/${props.propertyId}`}
                  className='btn btn-gray-o prop-btn'
                >
                  Floor Plan
                </Link>
                <Link
                  to={`/${props.propertyId}/unit`}
                  className='btn btn-base prop-btn m-l-5'
                >
                  Units
                </Link>
            </div>
            
            <ToolkitProvider
              keyField='id'
              data={Object.values(property.units)}
              columns={showFooter ? columnsFooter : columns}
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
        <Row>
          <Col>
            <Button
                size='sm'
                outline
                color='red'
                className='tbl-btn-close'
                disabled={deleteBulkDisabled}
                onClick={e => handleToggle(property.id, -1)}
              >
                Delete Checked
              </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
