import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ListGroup,
  ListGroupItem,
  FormGroup,
  InputGroup,
  Input,
  Button
} from 'reactstrap'

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
                    <Input disabled value={account} />
                    <InputGroup>
                      <InputGroup.Addon addonType='append'>
                        <Button onClick={() => onAccountSelect(account)}>
                          Select this account
                        </Button>
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
