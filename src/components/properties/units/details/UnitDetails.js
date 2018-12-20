import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'

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
    <div className="top-bar">
      <Container>
        <Row>
          <Col>
            <h3 className="float-left">{' '}Unit</h3>
          </Col>
        </Row>
      </Container>
    </div>
    <br />
    <Container>
    <form className="">
        <div className="form-group row">
          <div className="col-12">
            <h3 className="bar-header">Details</h3>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <label className="form-label">Name</label>
            <input
              id='name'
              type="text"
              className="form-control"
              name='name'
              value={unit.name}
              onChange={onChange}
              disabled={mode === READING} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <label className="form-label">Bedrooms</label>
            <input
              id='bedrooms'
              name='bedrooms'
              className="form-control"
              type="number"
              disabled={mode === READING}
              onChange={onChange}
              value={unit.bedrooms}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <label className="form-label">Bathrooms</label>
            <input
              id='bathrooms'
              name='bathrooms'
              className="form-control"
              type="number"
              disabled={mode === READING}
              onChange={onChange}
              value={unit.bathrooms}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2">
            <label className="form-label">Sq. Ft. Min</label>
            <input
              id='sq_ft_min'
              name='sq_ft_min'
              className="form-control"
              type="number"
              disabled={mode === READING}
              onChange={onChange}
              value={unit.sq_ft_min}
            />
          </div>
          <div className="col-12 col-md-5 col-lg-4">
            <label className="form-label">Sq. Ft. Max</label>
            <input
              id='sq_ft_max'
              name='sq_ft_max'
              className="form-control"
              type="number"
              disabled={mode === READING}
              onChange={onChange}
              value={unit.sq_ft_max}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2">
            <label className="form-label">Rent Min</label>
            <input
              id='rent_min'
              name='rent_min'
              className="form-control"
              type="number"
              disabled={mode === READING}
              onChange={onChange}
              value={unit.rent_min}
            />
          </div>
          <div className="col-12 col-md-5 col-lg-4">
            <label className="form-label">Rent Max</label>
            <input
              id='rent_max'
              name='rent_max'
              className="form-control"
              type="number"
              disabled={mode === READING}
              onChange={onChange}
              value={unit.rent_max}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <label className="form-label">Status</label>
            <input
              id='status'
              type="text"
              className="form-control"
              name='status'
              value={unit.status}
              onChange={onChange}
              disabled={mode === READING} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <label className="form-label">Date Available</label>
            <input
              id='dateAvailable'
              type="text"
              className="form-control"
              name='dateAvailable'
              value={unit.date_available}
              onChange={onChange}
              disabled={mode === READING} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <label className="form-label">Term Pricing</label>
            <input
              id='termPricing'
              type="text"
              className="form-control"
              name='termPricing'
              value='0'
              onChange={onChange}
              disabled={mode === READING} />
          </div>
        </div>
        { mode === EDITING &&
          <div className="form-group row">
            <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
              <Dropzone
                multiple={false}
                accept="image/*"
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
        }
        <div className="form-group m-t-50 row">
          <div className="col-md-5 col-lg-4 offset-md-1 offset-lg-2 col-6">
            <button
              type="button"
              className="btn btn-base w100 form-btn"
              hidden={mode !== READING}
              onClick={(e) => onEditClick(e, unit)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-base w100 form-btn"
              hidden={mode !== EDITING}
              onClick={(e) => onSaveClick(e)} style={{marginRight: '0.5em'}}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-base w100 form-btn"
              hidden={mode !== CREATING}
              onClick={(e) => onCreateClick(e, unit)}
            >
              Create
            </button>
          </div>
          <div className="col-md-5 col-lg-4 col-6">
            <Link to={mode === CREATING ? '/' : `/${unit.id}`}>
              <button
                type="button"
                className="btn btn-gray-o w100 form-btn"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </Container>
  </div>
)

export default UnitDetails