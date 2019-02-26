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

export default props => {
  const { property, onChange, handleToggle, deleteBulkDisabled, showTable } = props
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
        <Container>
          <Row>
            <div className='col-12 col-md-4 m-xs-b-10'>
              <h3>{property.name} </h3>
            </div>
            <div className='col-10 col-md-4 tc tl-xs'>
              <Link to={`/${property.id}`} className='btn btn-base-o prop-btn'>
                Floor Plan
              </Link>
              <Link
                to={`/${property.id}/unit`}
                className='btn btn-gray-o prop-btn m-l-5'
              >
                Units
              </Link>
            </div>
            <div className='col-2 col-md-4'>
              <h3 className='float-right'>
                <Link to={`/${props.propertyId}/floorplan/new`}>
                  <img src={IconAdd} alt='' />
                  <span className='hide-xs'>New Floor Plan</span>
                </Link>
              </h3>
            </div>
          </Row>
        </Container>
      </div>
      <br />
      { showTable &&
        <Container>
          <Row>
          <Col sm='12'>
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
                    pagination={paginationFactory()}
                  />
                </React.Fragment>
              )}
            </ToolkitProvider>
          </Col>
        </Row>
        </Container>
      }
    </div>
  )
}
