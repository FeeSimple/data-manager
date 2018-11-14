import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, Form, FormGroup, Input, Alert, Collapse, UncontrolledTooltip, Label, Col
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkResourceAmountError } from '../../utils/eoshelper'

const ManageCpuBwForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalCpuBw, handleToggleModalCpuBw, isCpu, 
    isStake, setStake, setUnstake, handleManageCpuBw,
    isProcessing, resourceHandleErr
  } = props

  return (
    <Modal isOpen={showModalCpuBw} toggle={handleToggleModalCpuBw}>
      <ModalHeader toggle={handleToggleModalCpuBw}>
        { isCpu ? <span>Manage CPU</span> : <span>Manage Bandwidth</span> }
      </ModalHeader>
      <ModalBody>
        <div className="form-group row">
          <Col xs={12} sm={6}>
            <Button 
              className="btn-base btn-home btn btn-secondary"
              onClick={ setStake }
            >
              Stake
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button 
              className="btn-base btn-home btn btn-secondary"
              onClick={ setUnstake }
            >
              Unstake
            </Button>
          </Col>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              { isCpu ? <span>CPU</span> : <span>Bandwidth</span>} &nbsp;
              { isStake ? <span>stake</span> : <span>unstake</span>} (in XFS)
            </Label>
            <Input
              id='xfsAmount'
              onBlur={handleBlur}
              value={values.xfsAmount}
              onChange={handleChange}
              invalid={errors.xfsAmount && touched.xfsAmount}
              type="text"
            />
          </FormGroup>
          <Button 
            type="submit" color='secondary' className="btn-base btn-home"
            disabled={ touched.xfsAmount && errors.xfsAmount }
          >
            {isProcessing ?
              <Spinner name="three-bounce" color="red"/>
            :
              <span>Submit</span>
            }
            
          </Button>
          <Collapse isOpen={resourceHandleErr}>
            {resourceHandleErr === 'Success'?
              <Alert color='success'>
                {
                  isStake?
                    <div>
                      <div><b>Successful staking!</b></div>
                      <div>{values.xfsAmount} XFS has been deducted from your balance</div>
                    </div>
                  :
                    <div>
                      <div><b>Successful unstaking!</b></div>
                      <div>{values.xfsAmount} XFS will be transferred back to your balance after 3 days</div>
                    </div>
                }
              </Alert>
            :
              <Alert color='danger'>
                {resourceHandleErr}
              </Alert>  
            }
            
          </Collapse>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  )
}

const EnhancedManageCpuBwForm = withFormik({
  mapPropsToValues: () => ({ xfsAmount: ''}),
  validate: values => {
    let errMsg = checkResourceAmountError(values.xfsAmount)
    if (errMsg) {
      return {xfsAmount: errMsg}
    } else {
      return {}
    }
  },

  handleSubmit: async({ xfsAmount }, { props }) => {
    await props.handleManageCpuBw(xfsAmount)
  },

  displayName: 'ManageCpuBwForm' // helps with React DevTools
})(ManageCpuBwForm)

export default EnhancedManageCpuBwForm
