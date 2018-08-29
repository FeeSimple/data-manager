import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { withFormik } from 'formik'

const LoginForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    onScatterClick,
    scatterDetected
  } = props

  console.info('scatter Detected',scatterDetected)

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='privKey'>Unlock Wallet</Label>
        <Input
          id='privKey'
          placeholder="Enter your 'active' private key"
          onBlur={handleBlur}
          value={values.privKey}
          onChange={handleChange}
          invalid={errors.privKey && touched.privKey}
        />
        {errors.privKey &&
        touched.privKey && (
          <FormFeedback>{errors.privKey}</FormFeedback>
        )}
      </FormGroup>
      
      <Button type='submit' color='primary'>Unlock</Button>{' '}
      {scatterDetected && 
        <Button type='button' outline color='primary' onClick={onScatterClick}>Scatter</Button>
      }
    </Form>
  )
}

const EnhancedLoginForm = withFormik({
  mapPropsToValues: () => ({ privKey: '' }),
  validate: values => {
    let errors = {};
    if (!values.privKey) {
      errors.privKey = 'Required';
    } else if (values.privKey.length !== 51) {
      errors.privKey = 'Invalid private key';
    }
    return errors;
  },

  handleSubmit: ({ privKey }, { props }) => {
    props.handleImportPrivKey(privKey)
  },

  displayName: 'LoginForm', // helps with React DevTools
})(LoginForm)

export default EnhancedLoginForm