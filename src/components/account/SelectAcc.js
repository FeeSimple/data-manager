import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap'

export default function SelectAcc (props) {
  const { accounts, handleToggle, onAccountSelect, isOpen} = props
  return (
    <Modal isOpen={isOpen} toggle={handleToggle} >
      <ModalHeader toggle={handleToggle}>Please select an account</ModalHeader>
      <ModalBody>
        <ListGroup>
          {
            accounts.map(account =>
              (
                <ListGroupItem key={account}>
                  <FormGroup>
                    <FormControl disabled value={account} />
                    <InputGroup>
                      <InputGroup.Addon addonType='append'>
                        <Button onClick={() => onAccountSelect(account)}>Select this account</Button>
                      </InputGroup.Addon>
                    </InputGroup>
                  </FormGroup>
                </ListGroupItem>
              )
            )
          }
        </ListGroup>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}
