import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import IconEditGrey from '../../../img/icon-edit-grey.svg'
import IconAdd from '../../../img/icon-add.svg'
import UnitRow from './Row'

export default props => {
  const { propertyId, property, onChange, handleToggle } = props
  return (
    <div>
      <div className='top-bar'>
        <Container>
          <Row>
            <div className='col-12 col-md-4 m-xs-b-10'>
              <h3>{property.name} </h3>
            </div>
            <div className='col-10 col-md-4 tc tl-xs'>
              <Link
                to={`/${props.propertyId}`}
                className='btn btn-gray-o prop-btn'
              >
                Floor Plan
              </Link>
              <Link
                to={`/${props.propertyId}/unit`}
                className='btn btn-base-o prop-btn'
              >
                Units
              </Link>
            </div>
            <div className='col-2 col-md-4'>
              <h3 className='float-right'>
                <Link to={`/${props.propertyId}/unit/new`}>
                  <img src={IconAdd} alt='' />
                  <span className='hide-xs'>New Unit</span>
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
                              onChange={onChange}
                              handleToggle={handleToggle}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12'>
                    <Button
                      size='sm'
                      outline
                      color='red'
                      // onClick={() => deleteBulk(property.id)}
                      onClick={e => handleToggle(property.id, -1)}
                    >
                      Delete Checked
                    </Button>
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
