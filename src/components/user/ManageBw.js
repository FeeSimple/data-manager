import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Input, Alert, Collapse
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkAccountNameError } from '../../utils/eoshelper'

const ManageBwForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalBw, handleToggleModalBw,
    isProcessing, resourceHandleErr
  } = props

  return (
    <Modal isOpen={showModalBw} toggle={handleToggleModalBw} >
      <ModalHeader toggle={handleToggleModalBw}>Stake/unstake Bandwidth</ModalHeader>
      <ModalBody>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}

const EnhancedManageBwForm = withFormik({
  mapPropsToValues: () => ({ accountName: '' }),
  validate: values => {
    return checkAccountNameError(values.accountName)
  },

  handleSubmit: async({ accountName }, { props }) => {
    await props.handleCreateNewAccount(accountName)
  },

  displayName: 'ManageBwForm' // helps with React DevTools
})(ManageBwForm)

export default EnhancedManageBwForm
