import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import {
  checkAccountNameError,
  checkXfsAmountError
} from '../../utils/eoshelper'

const UserSendForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isProcessing,
    toggle,
    user
  } = props

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <div className='form-group'>
          <div className='col-12'>
            <div className='form-group m-b-0'>
              <Label> To account </Label>
              <Input
                id='accountName'
                onBlur={handleBlur}
                value={values.accountName}
                onChange={handleChange}
                invalid={errors.accountName && touched.accountName}
                type='text'
              />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-12'>
            <div className='form-group m-b-0'>
              <Label> XFS Amount </Label>
              <a className='fr' href='#' 
                  onClick={() => {
                    values.amount=new Intl.NumberFormat().format(user.balanceNumber.toFixed(3)).toString()
                  }}>
                Send Max
              </a>
              <Input
                id='amount'
                onBlur={handleBlur}
                value={values.amount}
                onChange={handleChange}
                invalid={errors.amount && touched.amount}
                type='text'
              />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-12'>
            <div className='form-group'>
              <Label> Message (optional) </Label>
              <Input
                id='memo'
                onBlur={handleBlur}
                value={values.memo}
                onChange={handleChange}
                type='text'
                placeholder='Attach some message (max 200 characters)'
              />
            </div>
          </div>
        </div>
        <br />
        <div className='form-group row m-l-0 m-r-0 m-b-15'>
          <div className='col-6'>
            <Button
              color='gray-o'
              className='btn prop-btn w100'
              onClick={toggle}
            >
              Cancel
            </Button>
          </div>
          <div className='col-6'>
            <Button
              id='butt'
              type='submit'
              color='base'
              className='btn prop-btn w100'
              disabled={
                (touched.accountName && errors.accountName) ||
                (touched.amount && errors.amount)
              }
            >
              {isProcessing ? (
                <Spinner name='three-bounce' color='white' fadeIn='none' />
              ) : (
                <span>Send</span>
              )}
            </Button>
          </div>
        </div>
      </FormGroup>
      
    </Form>
  )
}

const EnhancedUserSendForm = withFormik({
  mapPropsToValues: () => ({ accountName: '', amount: '', memo: '' }),
  validate: values => {
    let errMsg = checkAccountNameError(values.accountName)
    if (errMsg) {
      return { accountName: errMsg }
    }

    errMsg = checkXfsAmountError(values.amount)
    if (errMsg) {
      return { amount: errMsg }
    }

    return {}
  },

  handleSubmit: async ({ accountName, amount, memo }, { props }) => {
    await props.handleUserSend(accountName, parseFloat(amount.replace(',', '')), memo)
  },

  displayName: 'UserSendForm' // helps with React DevTools
})(UserSendForm)

export default EnhancedUserSendForm
