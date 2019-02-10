import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import ImagesUploader from 'react-images-uploader-fs'
import 'react-images-uploader-fs/styles.css'

const FloorplanDetails = ({
  floorplan,
  propertyId,
  isCreating,
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
            <h3 className='float-left'>Floorplan</h3>
          </Col>
        </Row>
      </Container>
    </div>
    <br />
    <Container>
      <form className=''>
        <div className='form-group row'>
          <div className='col-12'>
            <h3 className='bar-header'>Details</h3>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Name</label>
            <input
              id='name'
              type='text'
              className='form-control'
              name='name'
              value={floorplan.name}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Bedrooms</label>
            <input
              id='bedrooms'
              name='bedrooms'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.bedrooms}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Bathrooms</label>
            <input
              id='bathrooms'
              name='bathrooms'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.bathrooms}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2'>
            <label className='form-label'>Sq. Ft. Min</label>
            <input
              id='sq_ft_min'
              name='sq_ft_min'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.sq_ft_min}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <label className='form-label'>Sq. Ft. Max</label>
            <input
              id='sq_ft_max'
              name='sq_ft_max'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.sq_ft_max}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2'>
            <label className='form-label'>Rent Min</label>
            <input
              id='rent_min'
              name='rent_min'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.rent_min}
            />
          </div>
          <div className='col-12 col-md-5 col-lg-4'>
            <label className='form-label'>Rent Max</label>
            <input
              id='rent_max'
              name='rent_max'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.rent_max}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Deposit</label>
            <input
              id='deposit'
              name='deposit'
              className='form-control'
              type='number'
              onChange={onChange}
              value={floorplan.deposit}
            />
          </div>
        </div>
        {galleryItems &&
          galleryItems.length > 0 && (
            <div className='form-group row'>
              <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
                <ImageGallery items={galleryItems} />
              </div>
            </div>
          )}
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <ImagesUploader
              url={process.env.REACT_APP_IPFS_IMAGES_UPLOADER_ADDR}
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
      </form>
    </Container>
  </div>
)

export default FloorplanDetails
