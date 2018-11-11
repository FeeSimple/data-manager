import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Input, Alert, Collapse, UncontrolledTooltip, Label
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkAccountNameError, checkBwAmountError } from '../../utils/eoshelper'

const ManageCpuBwForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalCpuBw, handleToggleModalCpuBw, isCpu,
    isProcessing, resourceHandleErr
  } = props

  return (
    <Modal isOpen={showModalCpuBw} toggle={handleToggleModalCpuBw}>
      <ModalHeader toggle={handleToggleModalCpuBw}>
        { isCpu ? <span>Stake/unstake CPU</span> : <span>Stake/unstake Bandwidth</span> }
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>CPU stake</Label>
            <Input
              id='accountName'
              onBlur={handleBlur}
              value={values.accountName}
              onChange={handleChange}
              invalid={errors.accountName && touched.accountName}
              type="text"
              placeholder="must be 12 symbols long and include symbols a-z 1-5"
            />
            <UncontrolledTooltip placement="right" target="accountName" styleName="tooltip">
              <p>
                Enter your own account for buying more Bw
              </p>
              <p>
                or enter another account for selling your Bw
              </p>
            </UncontrolledTooltip>
          </FormGroup>
          <FormGroup>
            <Input
              id='BwAmount'
              onBlur={handleBlur}
              value={values.BwAmount}
              onChange={handleChange}
              invalid={errors.BwAmount && touched.BwAmount}
              type="text"
              placeholder="Bw amount (in bytes)"
            />
            <UncontrolledTooltip placement="right" target="BwAmount" styleName="tooltip">
              <p>
                Must be above 10 bytes
              </p>
            </UncontrolledTooltip>
          </FormGroup>
          <Button 
            type="submit" color='secondary' className="btn-base btn-home"
            disabled={(touched.accountName && errors.accountName) ||
                      (touched.BwAmount && errors.BwAmount)}
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

const EnhancedManageCpuBwForm = withFormik({
  mapPropsToValues: () => ({ accountName: '', BwAmount: '' }),
  validate: values => {
    let errMsg = checkAccountNameError(values.accountName)
    if (errMsg) {
      return {accountName: errMsg}
    }
    
    errMsg = checkBwAmountError(values.BwAmount)
    if (errMsg) {
      return {BwAmount: errMsg}
    }

    return {}
  },

  handleSubmit: async({ accountName, BwAmount }, { props }) => {
    await props.handleManageCpuBw(accountName, BwAmount)
  },

  displayName: 'ManageCpuBwForm' // helps with React DevTools
})(ManageCpuBwForm)

export default EnhancedManageCpuBwForm
