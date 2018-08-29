import React from 'react'
import { 
    Button, 
    Modal,
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    ListGroup,
    ListGroupItem,
    InputGroup,
    InputGroupAddon,
    Input
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
                                        <Input disabled value={account}/>
                                        <InputGroupAddon addonType="append">
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
            <ModalFooter>
            </ModalFooter>
        </Modal>
    )
}