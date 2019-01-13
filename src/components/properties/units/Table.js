import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import IconEditGrey from '../../../img/icon-edit-grey.svg'
import IconAdd from '../../../img/icon-add.svg'
import UnitRow from './Row'

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
        <div id='TableSorting_wrapper' className='dataTables_wrapper'>
          <div className="dataTables_length" id="example_length">
            <select name="example_length" aria-controls="example">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select> 
          </div>
          <div id="example_filter" className="dataTables_filter">
            <label>Search:
              <input type="search" placeholder="" aria-controls="example" />
            </label>
          </div>
          <table id='TableSorting' className='table table-striped dataTable' 
            role='grid' aria-describedby='TableSorting_info'>
            <thead>
              <tr role='row'>
                <th
                  style={{ width: 15 }}
                  className='sorting_disabled'
                  rowSpan='1'
                  colSpan='1'
                  aria-label=''
                />
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='ID: activate to sort column ascending'
                  style={{ width: 51 }}
                >
                  ID
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Unit: activate to sort column ascending'
                  style={{ width: 148 }}
                >
                  Unit
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Type: activate to sort column ascending'
                  style={{ width: 147 }}
                >
                  Type
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Sq, Ft.: activate to sort column ascending'
                  style={{ width: 95 }}
                >
                  Sq, Ft.
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Rent: activate to sort column ascending'
                  style={{ width: 147 }}
                >
                  Rent
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Status: activate to sort column ascending'
                  style={{ width: 147 }}
                >
                  Status
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Date Available: activate to sort column ascending'
                  style={{ width: 147 }}
                >
                  Date Available
                </th>
                <th
                  className='sorting'
                  tabIndex='0'
                  aria-controls='TableSorting'
                  rowSpan='1'
                  colSpan='1'
                  aria-label='Term Pricing: activate to sort column ascending'
                  style={{ width: 139 }}
                >
                  Term Pricing
                </th>
                <th
                  style={{ width: 20 }}
                  className='sorting_disabled'
                  rowSpan='1'
                  colSpan='1'
                  aria-label=''
                />
                <th
                  style={{ width: 20 }}
                  className='sorting_disabled'
                  rowSpan='1'
                  colSpan='1'
                  aria-label=''
                />
              </tr>
            </thead>
            <tbody>
              {property.units &&
                Object.keys(property.units).length > 0 &&
                Object.keys(property.units).map(unitid => (
                  <UnitRow
                    key={unitid}
                    unit={property.units[unitid]}
                    property={property}
                  />
                ))}
            </tbody>
          </table>
          <div className="dataTables_paginate paging_simple_numbers" id="example_paginate">
            <a className="paginate_button previous disabled" aria-controls="example" 
              data-dt-idx="0" tabindex="0" id="example_previous">
              Previous
            </a>
            <span>
              <a className="paginate_button current" aria-controls="example" data-dt-idx="1" tabindex="0">1</a>
              <a className="paginate_button " aria-controls="example" data-dt-idx="2" tabindex="0">2</a>
              <a className="paginate_button " aria-controls="example" data-dt-idx="3" tabindex="0">3</a>
              <a className="paginate_button " aria-controls="example" data-dt-idx="4" tabindex="0">4</a>
              <a className="paginate_button " aria-controls="example" data-dt-idx="5" tabindex="0">5</a>
              <a className="paginate_button " aria-controls="example" data-dt-idx="6" tabindex="0">6</a>
            </span>
            <a className="paginate_button next" aria-controls="example" data-dt-idx="7" tabindex="0" id="example_next">
              Next
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
