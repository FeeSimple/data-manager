import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function SelectAcc (props) {
    const { accounts, handleToggle, onAccountSelect, isOpen} = props
    return (
        <Modal isOpen={isOpen} toggle={handleToggle} >
            <ModalHeader toggle={handleToggle}>Please select an account</ModalHeader>
            <ModalBody>
                {accounts.map(account => 
                    <div key={account}>
                        <p >{account}</p>
                        <Button onClick={onAccountSelect}>Select this account</Button>
                    </div>)
                }
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </Modal>
    )
}