import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import Spinner from 'react-spinkit'
import IconDelete from '../../../img/icon-delete.svg'
import IconEditBlue from '../../../img/icon-edit-blue.svg'
import IconEditSqr from '../../../img/icon-edit-sq.svg'
import IconCloseSqr from '../../../img/icon-close-sq.svg'
import IconAddSqr from '../../../img/icon-plus-sq.svg'

const NoDataIndication = () => {
  const hrefLinkFloor = `${window.location.href}/floorplan/new`
  return (
    <div className='w-100 text-center'>
      <span>
        This property has no floorplans. Would you like to{' '}
        <a href={hrefLinkFloor}>add</a> one?
      </span>
    </div>
  )
}

export default props => {
  const {
    property,
    onChange,
    handleToggle,
    deleteBulkDisabled,
    showFooter
  } = props
  const { SearchBar } = Search
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
            <div className='col-6 col-md-7'>
              <h3 className='float-left'>{property.name}</h3>
            </div>
            <div className='col-6  col-md-5'>
              <ul className='properties-menu'>
                <li>
                  <Link to={`/${property.id}/edit`}>
                    <img src={IconEditSqr} alt='' />
                  </Link>
                </li>
                <li>
                  <button
                    className='float-right del-btn-fx-property'
                    onClick={e => handleToggle(property.id, -2)}
                  >
                    <img
                      src={IconCloseSqr}
                      alt=''
                      style={{ width: '40px', height: '40px' }}
                    />
                  </button>
                </li>
                <li className='dropdown-li'>
                  <Link to={`/`}>
                    <img src={IconAddSqr} alt='' />
                  </Link>
                  <div className='properties-dropdpwn'>
                    <Link to={`/${props.propertyId}/floorplan/new`}>
                      Add Floor Plans
                    </Link>{' '}
                    <Link to={`/${props.propertyId}/unit/new`}>Add Unit</Link>
                  </div>
                </li>
              </ul>
            </div>
          </Row>
        </div>
      </div>
      <Container>
        <Row>
          <Col sm='12'>
            <div className='floor-btns'>
              <Link to={`/${property.id}`} className='btn btn-base prop-btn'>
                Floor Plans
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
