import React from 'react'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Collapse
} from 'reactstrap'

import { checkAccountNameError } from '../../utils/eoshelper'

const NewAccForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isOpen,
    handleToggle,
    isOpenKeyPair,
    accountPubKey,
    accountPrivKey,
    newAccountCreationErr,
    isProcessing
  } = props

  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>
        <div className='fs-16 clr-base tc'>Create a FeeSimple Account</div>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First, enter in a unique 12 character account name:</Label>
            <Input
              id='accountName'
              onBlur={handleBlur}
              value={values.accountName}
              onChange={handleChange}
              invalid={errors.accountName && touched.accountName}
              type='text'
              autocomplete='off'
							maxlength='12'
            />
          </FormGroup>
          <Button
            type='submit'
            color='secondary'
            className='btn-base btn-home mb-0'
            disabled={touched.accountName && errors.accountName}
          >
            {isProcessing ? (
              <Spinner name='three-bounce' color='white' fadeIn='none' />
            ) : (
              <span>Submit</span>
            )}
          </Button>
          <Collapse isOpen={isOpenKeyPair}>
            <Alert color='success'>
              <h4 className='alert-heading'>Account created!</h4>
              <p>
                Please make sure to store your private key somewhere safe. You
                will need it to recover your account.
              </p>
            </Alert>
            <FormGroup>
              <Label>Public Key</Label>
              <Input
                type='text'
                id='accountPubKey'
                value={accountPubKey}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label>Private Key</Label>
              <Input
                type='text'
                id='accountPrivKey'
                value={accountPrivKey}
                readOnly
              />
            </FormGroup>
          </Collapse>
          <Collapse isOpen={newAccountCreationErr}>
            <Alert color='danger'>{newAccountCreationErr}</Alert>
          </Collapse>
        </Form>
      </ModalBody>
      <ModalFooter>
        <i>
          FeeSimple account names are used to access the network, manage data and transact with the XFS token. Account names must be unique and 12 symbols long and can only include symbols a-z and 1-5.
        </i>
      </ModalFooter>
    </Modal>
  )
}

const EnhancedNewAccForm = withFormik({
  mapPropsToValues: () => ({ accountName: '' }),
  validate: values => {
    let errMsg = checkAccountNameError(values.accountName)
    if (errMsg) {
      return { accountName: errMsg }
    }

    return {}
  },

  handleSubmit: async ({ accountName }, { props }) => {
    await props.handleCreateNewAccount(accountName)
  },

  displayName: 'NewAccForm' // helps with React DevTools
})(NewAccForm)

export default EnhancedNewAccForm
