import React, { useCallback } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import ImagesUploader from 'react-images-uploader-fs'
import 'react-images-uploader-fs/styles.css'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { StyledPreview } from '../../../layout/DropZone'

const FloorplanDetails = ({
  floorplan,
  propertyId,
  isCreating,
  onCreateClick,
  onSaveClick,
  onChange,
  onImagesUploaded,
  handleUploadedImg,
  onImageDeleted,
  galleryItems,
  handleToggleConfirmDelImg
}) => (
  <div>
    <div className='top-bar'>
      <div className='container-fluid'>
        <Row>
          <Col>
            <h3 className='float-left'>Floorplan</h3>
          </Col>
        </Row>
      </div>
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
              id='name'
              type='text'
              className='form-control'
              name='name'
              value={floorplan.name}
              onChange={onChange}
              validate={{
                required: { value: true, errorMessage: 'Please enter a name' },
                minLength: { value: 1 }
              }}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Bedrooms'
              id='bedrooms'
              name='bedrooms'
              className='form-control'
              type='select'
              onChange={onChange}
              value={floorplan.bedrooms}
              min='0'
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </AvField>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Bathrooms'
              id='bathrooms'
              name='bathrooms'
              className='form-control'
              type='select'
              onChange={onChange}
              value={floorplan.bathrooms}
              min='0'
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </AvField>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2'>
            <AvField
              label='Sq. Ft. Min'
              id='sq_ft_min'
              name='sq_ft_min'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.sq_ft_min}
              min='0'
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <AvField
              label='Sq. Ft. Max'
              id='sq_ft_max'
              name='sq_ft_max'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.sq_ft_max}
              min='0.1'
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2'>
            <AvField
              label='Rent Min'
              id='rent_min'
              name='rent_min'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.rent_min}
              min='0'
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <AvField
              label='Rent Max'
              id='rent_max'
              name='rent_max'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.rent_max}
              min='0.1'
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Deposit'
              id='deposit'
              name='deposit'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.deposit}
              min='0'
            />
          </div>
        </div>
        {galleryItems && galleryItems.length > 0 && (
          <div className='form-group row'>
            <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
              {/* <ImageGallery items={galleryItems} /> */}
              <ul className='uploadedImgTumb'>
                {galleryItems.map(item => (
                  <li>
                    <span
                      className='imgDelBtn'
                      onClick={e => handleToggleConfirmDelImg(item.id)}
                    >
                      x
                    </span>{' '}
                    <a href={item.original} target="_blank"> 
                      <img src={item.thumbnail} style={{height: '90px', width: 'auto'}} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            {!isCreating && (
              <StyledPreview handleUploadedImg={handleUploadedImg} />
            )}
          </div>
        </div>
        <div className='form-group m-t-50 row'>
          <div className='col-md-5 col-lg-4 offset-md-1 offset-lg-2 col-6'>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              hidden={isCreating}
              onClick={e => onSaveClick(e)}
              style={{ marginRight: '0.5em' }}
            >
              Save
            </button>
            <button
              type='button'
              className='btn btn-base w100 form-btn'
              hidden={!isCreating}
              onClick={e => onCreateClick(e, floorplan)}
            >
              Create
            </button>
          </div>
          <div className='col-md-5 col-lg-4 col-6'>
            <Link to={`/${propertyId}`}>
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

export default FloorplanDetails
