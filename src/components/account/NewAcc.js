import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Label, Input, FormText, Alert, Collapse
} from 'reactstrap'
import { withFormik } from 'formik'

const NewAccForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isOpen, handleToggle, isOpenSubmit, handleToggleSubmit, handleCreateNewAccount 
  } = props

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} >
      <ModalHeader toggle={handleToggle}>Create a New Account</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Please enter account name</Label>
            <Input
              id='accountName'
              onBlur={handleBlur}
              value={values.accountName}
              onChange={handleChange}
              invalid={errors.accountName && touched.accountName}
              type="text"
              placeholder="must be 12 symbols long and include symbols a-z 1-5"
            />
          </FormGroup>
          <Button 
            type="submit" color='secondary' className="btn-base btn-home"
            onClick={handleToggleSubmit}
          >
            Submit
          </Button>
          <Collapse isOpen={isOpenSubmit}>
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

const EnhancedNewAccForm = withFormik({
  mapPropsToValues: () => ({ accountName: '' }),
  validate: values => {
    let errors = {}
    if (!values.accountName) {
      errors.accountName = 'Required'
    } else if (values.accountName.length !== 12) {
      errors.accountName = 'Invalid account name'
    }
    return errors
  },

  handleSubmit: ({ accountName }, { props }) => {
    props.handleCreateNewAccount(accountName)
  },

  displayName: 'NewAccForm' // helps with React DevTools
})(NewAccForm)

export default EnhancedNewAccForm
