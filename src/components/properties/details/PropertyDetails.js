import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import IconDelete from '../../../img/icon-delete.svg'

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
              value={property.name}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Address 1</label>
            <input
              id='address_1'
              className='form-control'
              placeholder=''
              name='address_1'
              type='textarea'
              onChange={onChange}
              value={property.address_1}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Address 2</label>
            <input
              id='address_2'
              className='form-control'
              name='address_2'
              type='textarea'
              value={property.address_2}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>City</label>
            <input
              id='city'
              className='form-control'
              name='city'
              type='text'
              onChange={onChange}
              value={property.city}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Postal Code</label>
            <input
              id='postal_code'
              name='postal_code'
              className='form-control'
              type='text'
              onChange={onChange}
              value={property.postal_code}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2'>
            <label className='form-label'>Unit Count</label>
            <input
              id='unit_count'
              name='unit_count'
              className='form-control'
              type='text'
              onChange={onChange}
              value={property.unit_count}
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
      </form>
    </Container>
  </div>
)

export default PropertyDetails
