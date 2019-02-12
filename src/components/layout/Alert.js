import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const Alert = props => {
  const { isOpen, handleToggle, alertHeader, alertContent } = props

  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>
        {alertHeader}
      </ModalHeader>
      <ModalBody>
        <ul>
          {
            alertContent.map(item => (
              <li>{item}</li>
            ))
          }
        </ul>
      </ModalBody>
    </Modal>
  )
}

export default Alert
