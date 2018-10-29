import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Label, Input, FormText, Alert, Collapse
} from 'reactstrap'
import { withFormik } from 'formik'
import getKeyPair from '../../utils/getKeyPair'

const NewAccForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isOpen, handleToggle, isOpenAccountKey, 
    handleToggleAccountKey, handleCreateNewAccount ,
    accountPubKey, accountPrivKey
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
          <Button type="submit" color='secondary' className="btn-base btn-home">
            Submit
          </Button>
          <Collapse isOpen={isOpenAccountKey}>
            <FormGroup>
              <Label>Public key</Label>
              <Input type="text" id="accountPubKey" value={accountPubKey} readOnly/>
            </FormGroup>
            <FormGroup>
              <Label>Private key</Label>
              <Input type="text" id="accountPrivKey" value={accountPrivKey} readOnly/>
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
    // errors.buttonSubmitActive = false
    const accountRegex = /^[a-z1-5]*$/
    if (!values.accountName) {
      errors.accountName = 'Required'
    } else if (values.accountName.length !== 12) {
      errors.accountName = 'Must be 12 symbols long'
    } else if (!accountRegex.test(values.accountName)) {
      errors.accountName = 'Must include symbols a-z 1-5'
    } else {
      // errors.buttonSubmitActive = true
    }
    // console.log('account validation error: ', errors)
    return errors
  },

  handleSubmit: async({ accountName }, { props }) => {
    let keyPair = await getKeyPair()
    console.log('handleSubmit: pub: ', keyPair.pub, ', private: ', keyPair.priv)

    const err = await props.handleCreateNewAccount(accountName, keyPair.priv, keyPair.pub)
    if (err) {
      console.log('handleSubmit - err:', err)
    } else {
      console.log('handleSubmit - ok')
    }
    
  },

  displayName: 'NewAccForm' // helps with React DevTools
})(NewAccForm)

export default EnhancedNewAccForm
