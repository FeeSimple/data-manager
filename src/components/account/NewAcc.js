import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Label, Input, FormText, Alert, Collapse
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkAccountNameError } from '../../utils/eoshelper'

const NewAccForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isOpen, handleToggle, 
    isOpenKeyPair, handleCreateNewAccount ,
    accountPubKey, accountPrivKey, newAccountCreationErr,
    isProcessing
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
            disabled={touched.accountName && errors.accountName}
          >
            {isProcessing ?
              <Spinner name="three-bounce" color="red"/>
            :
              <span>Submit</span>
            }
            
          </Button>
          <Collapse isOpen={isOpenKeyPair}>
            <FormGroup>
              <Label>Public key</Label>
              <Input type="text" id="accountPubKey" value={accountPubKey} readOnly/>
            </FormGroup>
            <FormGroup>
              <Label>Private key</Label>
              <Input type="text" id="accountPrivKey" value={accountPrivKey} readOnly/>
            </FormGroup>
            <Alert color="success">
              <h4 className="alert-heading">Account created!</h4>
              <p>
                Please make sure to store your private key somewhere safe
              </p>
            </Alert>
          </Collapse>
          <Collapse isOpen={newAccountCreationErr}>
            <Alert color="danger">
              {newAccountCreationErr}
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
    let errMsg = checkAccountNameError(values.accountName)
    if (errMsg) {
      return {accountName: errMsg}
    }
  },

  handleSubmit: async({ accountName }, { props }) => {
    await props.handleCreateNewAccount(accountName)
  },

  displayName: 'NewAccForm' // helps with React DevTools
})(NewAccForm)

export default EnhancedNewAccForm
