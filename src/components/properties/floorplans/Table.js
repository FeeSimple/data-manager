import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
// import FloorplanRow from './Row'
import IconAdd from '../../../img/icon-add.svg'
import IconDelete from '../../../img/icon-delete.svg'
import IconEditBlue from '../../../img/icon-edit-blue.svg'

function noFloorplanTxt (column, colIndex) {
  const hrefLink = `${window.location.href}/floorplan/new`
  return (
    <span style={{ fontSize: '11px' }}>
      This_property_has_no_floorplans. Would_you_like_to_<a href={hrefLink}>
        add
      </a>_one?
    </span>
  )
}

const footerBgColor = 'rgba(222, 222, 223, 0.75)'

export default props => {
  const {
    property,
    onChange,
    handleToggle,
    deleteBulkDisabled,
    showFooter
  } = props
  const { SearchBar } = Search
  const columnsFooter = [
    {
      dataField: 'checkboxField',
      text: '',
      isDummyField: true,
      formatter: (cellContent, row) => (
        <input type='checkbox' name={row.id} onChange={onChange} />
      ),
      headerStyle: { width: '40px' },
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'name',
      text: 'Floor Plan',
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'bathrooms',
      text: 'Type',
      isDummyField: true,
      formatter: (cellContent, row) =>
        `${row.bedrooms} beds / ${row.bathrooms} baths`,
      sort: true,
      footer: ``,
      footerStyle: {
        backgroundColor: footerBgColor,
        colSpan: '50'
      },
      footerFormatter: noFloorplanTxt
    },
    {
      dataField: 'sq_ft_min',
      text: 'Sq. Ft.',
      isDummyField: true,
      formatter: (cellContent, row) => `${row.sq_ft_min} - ${row.sq_ft_max}`,
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'rent_min',
      text: 'Rent',
      isDummyField: true,
      formatter: (cellContent, row) => `$${row.rent_min} - $${row.rent_max}`,
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'unit_count_dummy_field',
      text: '# Of Units',
      isDummyField: true,
      formatter: () => `${property.unit_count}`,
      sort: true,
      footer: '',
      footerStyle: {
        backgroundColor: footerBgColor
      }
    },
    {
      dataField: 'action_button_edit_dummy_field',
      text: '',
      isDummyField: true,
      headerStyle: { width: '70px' },
      formatter: (cellContent, row) => (
        <div>
          <Link
            to={`/${property.id}/floorplan/${row.id}`}
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
      headerStyle: { width: '40px' }
    },
    {
      dataField: 'id',
      text: 'ID',
      sort: true
    },
    {
      dataField: 'name',
      text: 'Floor Plan',
      sort: true
    },
    {
      dataField: 'bathrooms',
      text: 'Type',
      isDummyField: true,
      formatter: (cellContent, row) =>
        `${row.bedrooms} beds / ${row.bathrooms} baths`,
      sort: true
    },
    {
      dataField: 'sq_ft_min',
      text: 'Sq. Ft.',
      isDummyField: true,
      formatter: (cellContent, row) => `${row.sq_ft_min} - ${row.sq_ft_max}`,
      sort: true
    },
    {
      dataField: 'rent_min',
      text: 'Rent',
      isDummyField: true,
      formatter: (cellContent, row) => `$${row.rent_min} - $${row.rent_max}`,
      sort: true
    },
    {
      dataField: 'unit_count_dummy_field',
      text: '# Of Units',
      isDummyField: true,
      formatter: () => `${property.unit_count}`,
      sort: true
    },
    {
      dataField: 'action_button_edit_dummy_field',
      text: '',
      isDummyField: true,
      headerStyle: { width: '70px' },
      formatter: (cellContent, row) => (
        <div>
          <Link
            to={`/${property.id}/floorplan/${row.id}`}
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
      )
    }
  ]

  return (
    <div>
      <div className='top-bar'>
        <div className='container-fluid'>
          <Row>
            <div className='col-7 col-md-7'>
              <h3 className='float-left'>{property.name}</h3>
            </div>
            <div className='col-5  col-md-5'>
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
              <Link to={`/${property.id}`} className='btn btn-base prop-btn'>
                  Floor Plan
                </Link>
                <Link
                  to={`/${property.id}/unit`}
                  className='btn btn-gray-o prop-btn m-l-5'
                >
                  Units
                </Link>
            </div>
            <ToolkitProvider
              keyField='id'
              data={Object.values(property.floorplans)}
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
