import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input,
  Alert,
  Collapse,
  Col,
  Label
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import {
  checkXfsAmountError,
  RamBytes2Xfs,
  xfs2RamBytes
} from '../../../utils/eoshelper'
import { beautifyRam } from '../../../utils/beautify'

const ManageRamForm = props => {
  const {
    user,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showModalRam,
    handleToggleModalRam,
    setBuy,
    setSell,
    isBuy,
    isProcessing,
    resourceHandleErr
  } = props

  return (
    <div>
      <Modal isOpen={showModalRam} toggle={handleToggleModalRam}>
        <ModalHeader toggle={handleToggleModalRam}>
          <div className='fs-16 clr-base tc'>Buy or Sell RAM</div>
        </ModalHeader>
        <ModalBody className='px-5'>
          <div className='tc'>
            <Collapse isOpen={resourceHandleErr} size='sm'>
              {resourceHandleErr === 'Success' ? (
                <Alert color='success'>
                  <div>
                    <div>
                      <b>Transaction successful!</b>
                    </div>
                    <div>Your XFS balance has been updated.</div>
                  </div>
                </Alert>
              ) : (
                <Alert color='danger'>{<div>resourceHandleErr</div>}</Alert>
              )}
            </Collapse>
          </div>
          <div className='tc m-b-30'>
            Buy additional RAM or sell what you have:
          </div>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label className=''> XFS Amount</Label>
              <div className='fr'>
                <a
                  className='fl'
                  href='#'
                  onClick={() => {
                    values.xfsAmount = RamBytes2Xfs(
                      user.ramAvailable,
                      user.ramPrice
                    ).toFixed(3)
                  }}
                >
                  Sell Max
                </a>
                <a
                  className='fl m-l-10'
                  href='#'
                  onClick={() => {
                    values.xfsAmount = user.balanceNumber.toFixed(3)
                  }}
                >
                  Buy Max
                </a>
              </div>
              <Input
                id='xfsAmount'
                onBlur={handleBlur}
                value={values.xfsAmount}
                onChange={handleChange}
                invalid={errors.xfsAmount && touched.xfsAmount}
                type='text'
              />
            </FormGroup>
            <div className='col-12'>
              <h4 className='modal-h4 m-b-5'>In Bytes</h4>
              {values.xfsAmount && (
                <h2 className='modal-h2 m-b-5'>
                  {beautifyRam(
                    xfs2RamBytes(values.xfsAmount, user.ramPrice)
                  )}{' '}
                </h2>
              )}
              <h4 className='modal-h4 m-b-0'>1 kB = 0.02 XFS</h4>
            </div>
            <br />
            <div className='form-group row m-l-0 m-r-0'>
              <div className='col-6'>
                <Button
                  size='sm'
                  type='submit'
                  color='base'
                  className='btn prop-btn w100'
                  disabled={touched.xfsAmount && errors.xfsAmount}
                  onClick={setSell}
                >
                  {isProcessing && !isBuy ? (
                    <Spinner name='three-bounce' color='white' fadeIn='none' />
                  ) : (
                    <span>Sell</span>
                  )}
                </Button>
              </div>
              <div className='col-6'>
                <Button
                  size='sm'
                  type='submit'
                  color='base'
                  className='btn prop-btn w100'
                  disabled={touched.xfsAmount && errors.xfsAmount}
                  onClick={setBuy}
                >
                  {isProcessing && isBuy ? (
                    <Spinner name='three-bounce' color='white' fadeIn='none' />
                  ) : (
                    <span>Buy</span>
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

const EnhancedManageRamForm = withFormik({
  mapPropsToValues: () => ({ xfsAmount: '' }),
  validate: values => {
    let errMsg = checkXfsAmountError(values.xfsAmount)
    if (errMsg) {
      return { xfsAmount: errMsg }
    } else {
      return {}
    }
  },

  handleSubmit: async ({ xfsAmount }, { props }) => {
    console.log('handleSubmit')
    await props.handleManageRam(xfsAmount)
  },

  displayName: 'ManageRamForm' // helps with React DevTools
})(ManageRamForm)

export default EnhancedManageRamForm
