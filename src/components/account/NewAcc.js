import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap'

export default function NewAcc (props) {
  const { isOpen, handleToggle } = props
  return (
    <Modal isOpen={isOpen} toggle={handleToggle} >
      <ModalHeader toggle={handleToggle}>Please enter account name</ModalHeader>
      <ModalBody>
        <div class="create-box hide">
          <div id="pubkey-create" class="keydiv">
            <script src="https://unpkg.com/xregexp/xregexp-all.js"></script>
            <h3 id="pubkeytit">Account Name</h3>
            <h3 class="keydisplay" id="pubkeydis"></h3>
          </div>
          <div id="privkey-create" class="keydiv">
            <h3 id="privkeytit">Account Private Key</h3>
            <h3 class="keydisplay" id="privkeydis"></h3>
            <h3 id="warning">Please make sure you store your private key somewhere safe</h3>
          </div>
          <button id="generate-but" onclick="">GENERATE ACCOUNT</button>
          <h1 id="cross">X</h1>
        </div>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}
