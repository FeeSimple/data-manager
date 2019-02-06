import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Label
} from 'reactstrap'

const Confirm = props => {
  const {
    isOpen,
    handleToggle,
    onDelete,
    text
  } = props

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
    >
      <ModalHeader toggle={e => handleToggle(-1, -1)}>Please confirm</ModalHeader>
      <ModalBody>
        <div>
          <Label>Are you sure you want to delete {text}</Label>
        </div>
        <div className='form-group row'>
          <Col xs={12} sm={6}>
            <Button
              size='sm'
              outline
              color='primary'
              className='btn-base btn-home btn btn-secondary'
              onClick={e => handleToggle(-1, -1)}
            >
              No
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              size='sm'
              outline
              color='danger'
              className='btn-base btn-home btn btn-secondary'
              onClick={onDelete}
            >
              Yes
            </Button>
          </Col>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default Confirm
