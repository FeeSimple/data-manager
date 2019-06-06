import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { StyledPreview } from '../../layout/DropZone'
import ImageGallery from 'react-image-gallery'
import IconCloseSqr from '../../../img/icon-close-sq.svg'
import IconAddSqr from '../../../img/icon-plus-sq.svg'
import IconEditSqr from '../../../img/icon-edit-sq.svg'

const PropertyDetails = ({
  property,
  isCreating,
  onCreateClick,
  onSaveClick,
  onChange,
  handleUploadedImg,
  galleryItems,
  handleToggle,
  handleToggleConfirmDelImg
}) => (
  <div>
    <div className='top-bar'>
      <div className='container-fluid'>
        <Row>
          <Col>
            {isCreating ? (
              <h3 className='float-left'>New Property</h3>
            ) : (
              <h3 className='float-left'>{property.name}</h3>
            )}
          </Col>
          <Col>
            <ul className='properties-menu'>
              <li hidden={isCreating}>
                <Link to={`/${property.id}/edit`}>
                  <img src={IconEditSqr} alt='' />
                </Link>
              </li>
              <li>
                <button
                  className='float-right del-btn-fx-property'
                  hidden={isCreating}
                  onClick={e => handleToggle(property.id)}
                >
                  <img
                    src={IconCloseSqr}
                    alt=''
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </li>
              <li className='dropdown-li' hidden={isCreating}>
                <Link to={`/`}>
                  <img src={IconAddSqr} alt='' />
                </Link>
                <div className='properties-dropdpwn'>
                  <Link to={`/${property.id}/floorplan/new`}>
                    New Floor Plan
                  </Link>{' '}
                  <Link to={`/${property.id}/unit/new`}>New Unit</Link>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
    <br />
    <Container>
      <AvForm className=''>
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
              value={property.name}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Address 1'
              id='address_1'
              placeholder=''
              name='address_1'
              type='text'
              onChange={onChange}
              value={property.address_1}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Address 2'
              id='address_2'
              placeholder=''
              name='address_2'
              type='text'
              onChange={onChange}
              value={property.address_2}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='City'
              id='city'
              name='city'
              type='text'
              onChange={onChange}
              value={property.city}
              validate={{
                required: { value: true, errorMessage: 'Please enter a city' },
                minLength: { value: 1 }
              }}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='State/Province/Region'
              id='region'
              name='region'
              type='text'
              onChange={onChange}
              value={property.region}
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Please enter a state/province/region'
                },
                minLength: { value: 1 }
              }}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Postal Code'
              id='postal_code'
              name='postal_code'
              type='text'
              onChange={onChange}
              value={property.postal_code}
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Please enter a postal code'
                },
                minLength: { value: 1 }
              }}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <AvField
              label='Unit Count'
              id='unit_count'
              name='unit_count'
              type='number'
              onChange={onChange}
              value={property.unit_count}
              min='0'
            />
          </div>
        </div>
        {galleryItems && galleryItems.length > 0 && (
          <div className='form-group row'>
            <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
              {/*<ImageGallery items={galleryItems} />*/}
              <ul className='uploadedImgTumb'>
                {galleryItems.map(item => (
                  <li>
                    <span
                      className='imgDelBtn'
                      onClick={e => handleToggleConfirmDelImg(item.id)}
                    >
                      x
                    </span>{' '}
                    <a href={item.original} target='_blank'>
                      <img
                        src={item.thumbnail}
                        style={{ height: '90px', width: 'auto' }}
                      />
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
              onClick={e => onCreateClick(e, property)}
            >
              Create
            </button>
          </div>
          <div className='col-md-5 col-lg-4 col-6'>
            <Link to='/'>
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

export default PropertyDetails
