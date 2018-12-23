import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { AvForm, AvField } from 'availity-reactstrap-validation'

export const READING = 'reading'
export const EDITING = 'editing'
export const CREATING = 'creating'

const UnitDetails = ({
  unit,
  mode,
  onEditClick,
  onCreateClick,
  onSaveClick,
  onChange,
  onImageDrop
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
              label='Name'
              type='text'
              validate={{
                required: { value: true, errorMessage: 'Please enter a name' },
                minLength: { value: 1 }
              }}
              id='name'
              name='name'
              value={unit.name}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Bedrooms'
              type='number'
              min='0'
              id='bedrooms'
              name='bedrooms'
              value={unit.bedrooms}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Bathrooms'
              type='number'
              min='0'
              id='bathrooms'
              name='bathrooms'
              value={unit.bathrooms}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2'>
            <AvField
              label='Sq. Ft. Min'
              type='number'
              min='0'
              id='sq_ft_min'
              name='sq_ft_min'
              value={unit.sq_ft_min}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <AvField
              label='Sq. Ft. Max'
              type='number'
              min='0'
              id='sq_ft_max'
              name='sq_ft_max'
              value={unit.sq_ft_max}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2'>
            <AvField
              label='Rent Min'
              type='number'
              min='0'
              id='rent_min'
              name='rent_min'
              value={unit.rent_min}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <AvField
              label='Rent Max'
              type='number'
              min='0'
              id='rent_max'
              name='rent_max'
              value={unit.rent_max}
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Status</label>
            <div>
              <input
                type='radio'
                name='status'
                id='status'
                value='Leased'
                onChange={onChange}
              />{' '}
              <label className='form-label'>Leased</label>
            </div>
            <div>
              <input
                type='radio'
                name='status'
                id='status'
                value='Available'
                onChange={onChange}
              />{' '}
              <label className='form-label'>Available</label>
            </div>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              name='date_available'
              id='date_available'
              value={unit.date_available}
              label='Date Available'
              type='date'
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Term Pricing</label>
            <input
              id='termPricing'
              type='text'
              className='form-control'
              name='termPricing'
              onChange={onChange}
              disabled={mode === READING}
            />
          </div>
        </div>
        {mode === EDITING && (
          <div className='form-group row'>
            <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
              <Dropzone
                multiple={false}
                accept='image/*'
                onDrop={onImageDrop}
                className='dpz-default d-flex justify-content-center align-items-center'
                acceptClassName='dpz-accepted'
                activeClassName='dpc-active'
                disabledClassName='dpz-disabled'
                rejectClassName='dpz-rejected'
              >
                <p>Drag and drop a property image, such as a unit.</p>
              </Dropzone>
            </div>
          </div>
        )}
        <div className='form-group m-t-50 row'>
          <div className='col-md-5 col-lg-4 offset-md-1 offset-lg-2 col-6'>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              hidden={mode !== READING}
              onClick={e => onEditClick(e, unit)}
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
              onClick={e => onCreateClick(e, unit)}
            >
              Create
            </button>
          </div>
          <div className='col-md-5 col-lg-4 col-6'>
            <Link to={mode === CREATING ? '/' : `/${unit.id}`}>
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

export default UnitDetails
