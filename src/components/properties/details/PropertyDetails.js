import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import IconDelete from '../../../img/icon-delete.svg'
import { AvForm, AvField } from 'availity-reactstrap-validation'

const PropertyDetails = ({
  property,
  isCreating,
  onCreateClick,
  onSaveClick,
  onChange,
  handleToggle
}) => (
  <div>
    <div className='top-bar'>
      <Container>
        <Row>
          <Col>
            <h3 className='float-left'>New Property</h3>
          </Col>
          <Col>
            <button
              className='float-right'
              hidden={isCreating}
              onClick={e => handleToggle(property.id)}
            >
              <img
                src={IconDelete}
                alt=''
                style={{ width: '30px', height: '30px' }}
              />
            </button>
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
              label='Postal Code'
              id='postal_code'
              name='postal_code'
              type='text'
              onChange={onChange}
              value={property.postal_code}
              validate={{
                required: { value: true, errorMessage: 'Please enter a postal code' },
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
