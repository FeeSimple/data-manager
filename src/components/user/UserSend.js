import React from 'react'
import {
  Card, InputGroupText, InputGroupAddon, InputGroup,
  Button, Form, FormGroup, Input, Alert, Collapse, UncontrolledTooltip,
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkAccountNameError, checkXfsAmountError } from '../../utils/eoshelper'

const UserSendForm = props => {
  const { 
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    user,
    handleUserSend,
    userSendErr,
    isProcessing
  } = props

  return (
    <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <Card>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="user-send-text">
                <i>Spendable Balance</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              disabled
              placeholder={user.balance}
            />
          </InputGroup>
          <br />
          <InputGroup id='cpu'>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="user-send-text">
                <i>CPU Availability</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              disabled
              placeholder={user.cpuAvailableStr} µs
            />
            <UncontrolledTooltip placement="left" target="cpu" styleName="tooltip">
              <p>
                XFS sending will be charged with some CPU
              </p>
            </UncontrolledTooltip>
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="user-send-text">
                <b>To account</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              id='accountName'
              onBlur={handleBlur}
              value={values.accountName}
              onChange={handleChange}
              invalid={errors.accountName && touched.accountName}
              type="text"
              placeholder="Enter the recipient account"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="user-send-text">
                <b>Amount</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              id='amount'
              onBlur={handleBlur}
              value={values.amount}
              onChange={handleChange}
              invalid={errors.amount && touched.amount}
              type="text"
              placeholder="Enter the amount to send (in XFS)"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="user-send-text" size="lg">
                <b>Memo (optional)</b>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              id='memo'
              onBlur={handleBlur}
              value={values.memo}
              onChange={handleChange}
              type="text"
              placeholder="Attach some message (max 200 characters)" 
            />
          </InputGroup>
          <br />
        </FormGroup>
        <Button 
          type="submit" color='secondary' className="btn-base btn-home"
          disabled={(touched.accountName && errors.accountName) || 
                    (touched.amount && errors.amount)}
        >
          {isProcessing ?
            <Spinner name="three-bounce" color="white" noFadeIn/>
          :
            <span>Submit</span>
          }
          
        </Button>
        <Collapse isOpen={userSendErr} size='sm'>
          {userSendErr === 'Success'?
            <Alert color='success'>
              <div>
                <div><b>Successful sending!</b></div>
                <div>{values.amount} XFS will be deducted from your balance</div>
              </div>
            </Alert>
          :
            <Alert color='danger'>
              {userSendErr}
            </Alert>  
          }
        </Collapse>
      </Form>
      </Card>
    </div>
  )
}

const EnhancedUserSendForm = withFormik({
  mapPropsToValues: () => ({ accountName: '', amount: '', memo: '' }),
  validate: values => {
    let errMsg = checkAccountNameError(values.accountName)
    if (errMsg) {
      return {accountName: errMsg}
    }

    errMsg = checkXfsAmountError(values.amount)
    if (errMsg) {
      return {amount: errMsg}
    }

    return {}
  },

  handleSubmit: async({ accountName, amount, memo }, { props }) => {
    await props.handleUserSend(accountName, amount, memo)
  },

  displayName: 'UserSendForm' // helps with React DevTools
})(UserSendForm)

export default EnhancedUserSendForm
