import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Label, Input, FormText, Alert, Collapse
} from 'reactstrap'

export default function NewAcc (props) {
  const { isOpen, handleToggle, isOpenKey, handleToggleKey } = props
  return (
    <Modal isOpen={isOpen} toggle={handleToggle} >
      <ModalHeader toggle={handleToggle}>Create a New Account</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="accountName">Please enter account name</Label>
            <Input type="account" name="account" id="accountName" placeholder="must be 12 symbols long and include symbols a-z 1-5"/>
          </FormGroup>
          <Button color="primary" onClick={handleToggleKey} style={{ marginBottom: '1rem' }}>Submit</Button>
          <Collapse isOpen={isOpenKey}>
            <FormGroup>
              <Label for="accountPubKey">Public key</Label>
              <Input type="pubkey" name="pubkey" id="accountPubKey"/>
            </FormGroup>
            <FormGroup>
              <Label for="accountPrivKey">Private key</Label>
              <Input type="privkey" name="privkey" id="accountPrivKey"/>
            </FormGroup>
            <Alert color="danger">
              Please make sure to store your private key somewhere safe
            </Alert>
          </Collapse>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}
