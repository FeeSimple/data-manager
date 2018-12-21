import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ListGroup,
  ListGroupItem,
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
      <ModalBody>
        <ListGroup>
          {
            accounts.map(account =>
              (
                <ListGroupItem key={account}>
                    <InputGroup>
                      <Input disabled value={account} />
                      <InputGroupAddon addonType='append'>
                        <Button onClick={() => onAccountSelect(account)}>
                          Select this account
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
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
