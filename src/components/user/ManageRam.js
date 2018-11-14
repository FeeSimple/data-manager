import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Input, Alert, Collapse, UncontrolledTooltip
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkAccountNameError, checkRamAmountError } from '../../utils/eoshelper'

const ManageRamForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalRam, handleToggleModalRam, handleManageRam,
    isProcessing, resourceHandleErr
  } = props

  return (
    <Modal className="modal-dialog-resource" isOpen={showModalRam} toggle={handleToggleModalRam}>
      <ModalHeader toggle={handleToggleModalRam}>Buy/Sell RAM</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              id='accountName'
              onBlur={handleBlur}
              value={values.accountName}
              onChange={handleChange}
              invalid={errors.accountName && touched.accountName}
              type="text"
              placeholder="12 symbols long (a-z 1-5)"
            />
            <UncontrolledTooltip placement="right" target="accountName" styleName="tooltip">
              <p>
                Enter your own account for buying more RAM
              </p>
              <p>
                or enter another account for selling your RAM
              </p>
            </UncontrolledTooltip>
          </FormGroup>
          <FormGroup>
            <Input
              id='ramAmount'
              onBlur={handleBlur}
              value={values.ramAmount}
              onChange={handleChange}
              invalid={errors.ramAmount && touched.ramAmount}
              type="text"
              placeholder="RAM amount (in bytes)"
            />
            <UncontrolledTooltip placement="right" target="ramAmount" styleName="tooltip">
              <p>
                Must be above 10 bytes
              </p>
            </UncontrolledTooltip>
          </FormGroup>
          <Button 
            type="submit" color='secondary' className="btn-base btn-home"
            disabled={(touched.accountName && errors.accountName) ||
                      (touched.ramAmount && errors.ramAmount)}
          >
            {isProcessing ?
              <Spinner name="three-bounce" color="red"/>
            :
              <span>Submit</span>
            }
            
          </Button>
          <Collapse isOpen={resourceHandleErr}>
            <Alert color={resourceHandleErr === 'Success'? 'success':'danger'}>
              {resourceHandleErr}
            </Alert>
          </Collapse>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}

const EnhancedManageRamForm = withFormik({
  mapPropsToValues: () => ({ accountName: '', ramAmount: '' }),
  validate: values => {
    let errMsg = checkAccountNameError(values.accountName)
    if (errMsg) {
      return {accountName: errMsg}
    }
    
    errMsg = checkRamAmountError(values.ramAmount)
    if (errMsg) {
      return {ramAmount: errMsg}
    }

    return {}
  },

  handleSubmit: async({ accountName, ramAmount }, { props }) => {
    await props.handleManageRam(accountName, ramAmount)
  },

  displayName: 'ManageRamForm' // helps with React DevTools
})(ManageRamForm)

export default EnhancedManageRamForm
