import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import ImagesUploader from 'react-images-uploader-fs'
import 'react-images-uploader-fs/styles.css'
import { AvForm, AvField } from 'availity-reactstrap-validation'

const UnitDetails = ({
  unit,
  isCreating,
  isLeased,
  propertyId,
  onCreateClick,
  onSaveClick,
  onChange,
  onImagesUploaded,
  onImageDeleted,
  galleryItems
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
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <AvField
              label='Sq. Ft. Max'
              type='number'
              min='0.1'
              id='sq_ft_max'
              name='sq_ft_max'
              value={unit.sq_ft_max}
              onChange={onChange}
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
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <AvField
              label='Rent Max'
              type='number'
              min='0.1'
              id='rent_max'
              name='rent_max'
              value={unit.rent_max}
              onChange={onChange}
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
                checked={isLeased}
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
                checked={!isLeased}
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
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <ImageGallery items={galleryItems} />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <ImagesUploader
              url='http://localhost:9000/multiple'
              optimisticPreviews
              onLoadEnd={onImagesUploaded}
              onImageDeleted={onImageDeleted}
              label='Upload multiple images'
              styles={{
                label: {
                  fontFamily: 'Open sans, sans-serif',
                  fontSize: '14px'
                }
              }}
            />
          </div>
        </div>
        <div className='form-group m-t-50 row'>
          <div className='col-md-5 col-lg-4 offset-md-1 offset-lg-2 col-6'>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              onClick={e => onSaveClick(e)}
              style={{ marginRight: '0.5em' }}
              hidden={isCreating}
            >
              Save
            </button>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              onClick={e => onCreateClick(e, unit)}
              hidden={!isCreating}
            >
              Create
            </button>
          </div>
          <div className='col-md-5 col-lg-4 col-6'>
            <Link to={`/${propertyId}/unit`}>
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
