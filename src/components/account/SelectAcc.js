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
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap'

export default function SelectAcc (props) {
  const { accounts, handleToggle, onAccountSelect, isOpen} = props
  return (
    <Modal isOpen={isOpen} toggle={handleToggle} >
      <ModalHeader toggle={handleToggle}>Please select an account</ModalHeader>
      <ModalBody> hello
        <ListGroup>
          {
            accounts.map(account =>
              (
                <ListGroupItem key={account}>
                  <FormGroup>
                    <Input disabled value={account} />
                    <InputGroup>
                      <InputGroupAddon addonType='append'>
                        <Button onClick={() => onAccountSelect(account)}>
                          Select this account
                        </Button>
                      </InputGroupAddon>
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
