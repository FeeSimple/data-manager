import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import IconDelete from '../../../img/icon-delete.svg'

export const READING = 'reading'
export const EDITING = 'editing'
export const CREATING = 'creating'

const PropertyDetails = ({
  property,
  mode,
  onEditClick,
  onCreateClick,
  onSaveClick,
  onChange,
  onDelete
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
              onClick={e => onDelete(property.id)}
            >
              <img 
                src={IconDelete} alt='' 
                style={{width: '30px', height: '30  px' }}/>
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
              disabled={mode === READING}
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
              disabled={mode === READING}
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
              disabled={mode === READING}
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
              disabled={mode === READING}
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
              disabled={mode === READING}
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
              disabled={mode === READING}
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
              hidden={mode !== READING}
              onClick={e => onEditClick(e, property)}
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
              onClick={e => onCreateClick(e, property)}
            >
              Create
            </button>
          </div>
          <div className='col-md-5 col-lg-4 col-6'>
            <Link to={mode === CREATING ? '/' : `/${property.id}`}>
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
