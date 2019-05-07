import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Label } from 'reactstrap'

const Confirm = props => {
  const { isOpen, handleToggle, onDelete, text } = props

  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader toggle={e => handleToggle(-1, -1)}>
        Please Confirm
      </ModalHeader>
      <ModalBody>
        <div class='mb-3 text-center'>
          <Label>Are you sure you want to delete {text}?</Label>
        </div>
        <div className='form-group row mb-0'>
          <Col xs={12} sm={6}>
            <Button
              size='sm'
              outline
              color='danger'
              className='btn-base btn-home btn btn-gray-o mb-0'
              onClick={onDelete}
            >
              Yes
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              size='sm'
              outline
              color='primary'
              className='btn-base btn-home btn btn-secondary mb-0'
              onClick={e => handleToggle(-1, -1)}
            >
              No
            </Button>
          </Col>
        </div>
      </ModalBody>
			<ModalFooter>
        <i>
          Deleting a property will also remove all associated floor plans and units. Please proceed with caution as once deleted, this data cannot be recovered.
        </i>
      </ModalFooter>
    </Modal>
  )
}

export default Confirm
