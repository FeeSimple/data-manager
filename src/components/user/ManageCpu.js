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

const ManageCpuForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalCpu, handleToggleModalCpu,
    isProcessing, resourceHandleErr
  } = props

  return (
    <Modal isOpen={showModalCpu} toggle={handleToggleModalCpu} >
      <ModalHeader toggle={handleToggleModalCpu}>Stake/unstake CPU</ModalHeader>
      <ModalBody>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}

const EnhancedManageCpuForm = withFormik({
  mapPropsToValues: () => ({ accountName: '' }),
  validate: values => {
    return checkAccountNameError(values.accountName)
  },

  handleSubmit: async({ accountName }, { props }) => {
    await props.handleCreateNewAccount(accountName)
  },

  displayName: 'ManageCpuForm' // helps with React DevTools
})(ManageCpuForm)

export default EnhancedManageCpuForm
