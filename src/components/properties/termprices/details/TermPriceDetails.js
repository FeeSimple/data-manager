import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import { AvForm, AvField } from 'availity-reactstrap-validation'

export const READING = 'reading'
export const EDITING = 'editing'
export const CREATING = 'creating'

const TermPriceDetails = ({
  termprice,
  mode,
  onEditClick,
  onCreateClick,
  onSaveClick,
  onChange
}) => (
  <div>
    <div className='top-bar'>
      <Container>
        <Row>
          <Col>
            <h3 className='float-left'> Unit</h3>
          </Col>
        </Row>
      </Container>
    </div>
    <br />
    <Container>
      <AvForm className=''>
        <div className='form-group row'>
          <div className='col-12'>
            <h3 className='bar-header'>Details</h3>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Rent'
              type='number'
              id='rent'
              name='rent'
              value={termprice.rent}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Term'
              type='number'
              id='term'
              name='term'
              value={termprice.term}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Start Date'
              type='number'
              id='start_date'
              name='start_date'
              value={termprice.start_date}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='End Date'
              type='number'
              id='end_date'
              name='end_date'
              value={termprice.end_date}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group m-t-50 row'>
          <div className='col-md-5 col-lg-4 offset-md-1 offset-lg-2 col-6'>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              hidden={mode !== READING}
              onClick={e => onEditClick(e, termprice)}
            >
              Edit
            </button>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              hidden={mode !== EDITING}
              onClick={e => onSaveClick(e)}
              style={{ marginRight: '0.5em' }}
            >
              Save
            </button>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              hidden={mode !== CREATING}
              onClick={e => onCreateClick(e, termprice)}
            >
              Create
            </button>
          </div>
          <div className='col-md-5 col-lg-4 col-6'>
            <Link to={mode === CREATING ? '/' : `/${termprice.id}`}>
              <button type='button' className='btn btn-gray-o w100 form-btn'>
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </AvForm>
    </Container>
  </div>
)

export default TermPriceDetails
