import React from 'react'
import { Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import IconEditGrey from '../../../img/icon-edit-grey.svg'
import IconAdd from '../../../img/icon-add.svg'
import FloorplanRow from './Row'

export default props => {
  const { property, onDelete } = props
  return (
    <div>
      <div className='top-bar'>
        <Container>
          <Row>
            <div className='col-12 col-md-4 m-xs-b-10'>
              <h3>
                {property.name}{' '}
                <Link to={`/${props.propertyId}/edit`}>
                  <img src={IconEditGrey} alt='' />
                </Link>
              </h3>
            </div>
            {/* <div className='col-10 col-md-4 tc tl-xs'>
              <Link to='/' className='btn btn-base-o prop-btn'>
                Floor Plan
              </Link>
              <Link to='/' className='btn btn-gray-o prop-btn'>
                Units
              </Link>
            </div> */}
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
      <Container>
        <div className='row'>
          <div className='col-12 m-t-30 m-b-15'>
            <div className='table-responsive p-b-15 m-b-5'>
              <div
                id='TableSorting_wrapper'
                className='dataTables_wrapper dt-bootstrap4 no-footer'
              >
                <div className='row'>
                  <div className='col-sm-12'>
                    <table
                      id='TableSorting'
                      className='table table-striped dataTable no-footer'
                      role='grid'
                      aria-describedby='TableSorting_info'
                    >
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
                            aria-label='Ploor Plan: activate to sort column ascending'
                            style={{ width: 148 }}
                          >
                            Ploor Plan
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
                            aria-label='# Of Units: activate to sort column ascending'
                            style={{ width: 139 }}
                          >
                            # Of Units
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
                        {property.floorplans &&
                          Object.keys(property.floorplans).length > 0 &&
                          Object.keys(property.floorplans).map(floorplanId => (
                            <FloorplanRow
                              key={floorplanId}
                              floorplan={property.floorplans[floorplanId]}
                              property={property}
                              onDelete={onDelete}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
