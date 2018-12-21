import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button, Form, FormGroup, Input, Alert, Collapse, Col, Label
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkXfsAmountError } from '../../utils/eoshelper'

const ManageRamForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalRam, handleToggleModalRam,
    setBuy, setSell, isBuy, isProcessing, resourceHandleErr
  } = props

  return (
    <Modal className="modal-dialog-resource" isOpen={showModalRam} toggle={handleToggleModalRam}>
      <ModalHeader toggle={handleToggleModalRam}>Manage RAM</ModalHeader>
      <ModalBody>
        <div className="form-group row">
          <Col xs={12} sm={6}>
            <Button size="sm" outline color="danger"
              className="btn-base btn-home btn btn-secondary"
              onClick={ setBuy }
            >
              Buy
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button size="sm" outline color="primary"
              className="btn-base btn-home btn btn-secondary"
              onClick={ setSell }
            >
              Sell
            </Button>
          </Col>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className="user-detail-label">
              <span>RAM {' '}</span>
              { isBuy ? <span>buy</span> : <span>sell</span>} (in XFS)
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
          <Button size="sm"
            type="submit" color='secondary' className="btn-base btn-home"
            disabled={ touched.xfsAmount && errors.xfsAmount }
          >
            {isProcessing ?
              <Spinner name="three-bounce" color="white" noFadeIn/>
            :
              <span>Submit</span>
            }
          </Button>
        </Form>
        <Collapse isOpen={resourceHandleErr} size='sm'>
          {resourceHandleErr === 'Success'?
            <Alert color='success'>
              {
                isBuy?
                  <div>
                    <div><b>Successful buying!</b></div>
                    <div>{values.xfsAmount} XFS will be deducted</div>
                    <div>from your balance</div>
                  </div>
                :
                  <div>
                    <div><b>Successful selling!</b></div>
                    <div>{values.xfsAmount} XFS will be transferred back</div>
                    <div>to your balance</div>
                  </div>
              }
            </Alert>
          :
            <Alert color='danger'>
              {resourceHandleErr}
            </Alert>
          }
        </Collapse>
      </ModalBody>
    </Modal>
  )
}

const EnhancedManageRamForm = withFormik({
  mapPropsToValues: () => ({ xfsAmount: ''}),
  validate: values => {
    let errMsg = checkXfsAmountError(values.xfsAmount)
    if (errMsg) {
      return {xfsAmount: errMsg}
    } else {
      return {}
    }
  },

  handleSubmit: async({ xfsAmount }, { props }) => {
    console.log('handleSubmit');
    await props.handleManageRam(xfsAmount)
  },

  displayName: 'ManageRamForm' // helps with React DevTools
})(ManageRamForm)

export default EnhancedManageRamForm
