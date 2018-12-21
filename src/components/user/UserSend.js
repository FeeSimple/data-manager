import React from 'react'
import {
  Card, InputGroupText, InputGroupAddon, InputGroup, Col,
  Button, Form, FormGroup, Input, Alert, Collapse, UncontrolledTooltip,
} from 'reactstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinkit'
import { checkAccountNameError, checkXfsAmountError } from '../../utils/eoshelper'

const USER_SEND_TOOLTIP = 'XFS sending will be charged with some CPU and Bandwidth'

const balanceStr = (balance) => {
  return 'Balance: ' + balance
}

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
    <div className="col-lg-8 offset-md-1 offset-lg-2">
      <Card>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          <br />
          <InputGroup id='resource'>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="user-send-text-small">
                <i>CPU: {user.cpuAvailableStr}</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              disabled
              placeholder= { balanceStr(user.balance) }
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="user-send-text-small">
                <i>Bandwidth: {user.bandwidthAvailableStr}</i>
              </InputGroupText>
            </InputGroupAddon>
            <UncontrolledTooltip placement="right" target="resource" styleName="tooltip">
              {USER_SEND_TOOLTIP}
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
        <Button id='butt'
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
        <UncontrolledTooltip placement="right" target="butt" styleName="tooltip">
          {USER_SEND_TOOLTIP}
        </UncontrolledTooltip>
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
