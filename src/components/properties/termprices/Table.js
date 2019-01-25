import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import IconEditGrey from '../../../img/icon-edit-grey.svg'
import IconAdd from '../../../img/icon-add.svg'
import TermPriceRow from './Row'

export default props => {
  const { unit, termid, onDelete, onChange } = props
  return (
    <div>
      <div className='top-bar'>
        <Container>
          <Row>
            <Col>
              <h3 className='float-right'>
                <Link to={`/${props.propertyId}/unit/${unit.id}/termprice/new`}>
                  <img src={IconAdd} alt='' />
                  <span>New Term Price</span>
                </Link>
              </h3>
            </Col>
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
                            style={{ width: 60 }}
                          >
                            Rent
                          </th>
                          <th
                            className='sorting'
                            tabIndex='0'
                            aria-controls='TableSorting'
                            rowSpan='1'
                            colSpan='1'
                            aria-label='Type: activate to sort column ascending'
                            style={{ width: 60 }}
                          >
                            Term
                          </th>
                          <th
                            className='sorting'
                            tabIndex='0'
                            aria-controls='TableSorting'
                            rowSpan='1'
                            colSpan='1'
                            aria-label='Sq, Ft.: activate to sort column ascending'
                            style={{ width: 100 }}
                          >
                            Start Date
                          </th>
                          <th
                            className='sorting'
                            tabIndex='0'
                            aria-controls='TableSorting'
                            rowSpan='1'
                            colSpan='1'
                            aria-label='Rent: activate to sort column ascending'
                            style={{ width: 100 }}
                          >
                            End Date
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
                        {unit.termprices &&
                          Object.keys(unit.termprices).length > 0 &&
                          Object.keys(unit.termprices).map(termpriceId => (
                            <TermPriceRow
                              key={termpriceId}
                              termprice={unit.termprices[termpriceId]}
                              unit={unit}
                              propertyId={props.propertyId}
                              onDelete={onDelete}
                              onChange={onChange}
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
