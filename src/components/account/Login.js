import React from 'react'
import LogoLarge from '../../img/logo-large.svg'
import OpenReLogoLarge from '../../img/openre-logo-white.svg'
import { withFormik } from 'formik'
import {
  Button,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  Form
} from 'reactstrap'

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

  return (
    <div className="main-wrapper home">
      <Container>
        <Row>
          <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} xs={12}>
            <Form onSubmit={handleSubmit} className="form-horizontal home-form" >
              <FormGroup>
                <Col xs={12} className="text-center">
                  <a href="" className="logo-container">
                    <img src={LogoLarge} width="370" alt="Logo"/>
                  </a>
                </Col>
              </FormGroup>
              <FormGroup className="form-group">
                <Col xs={12} sm={6}>
                  <Button
                    onClick={onScatterClick}
                    disabled={!scatterDetected}
                    className="btn-base btn-home"
                  >
                    Unlock with Scatter
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <a href="" className="btn btn-base btn-home">Create a New Account</a>
                </Col>
              </FormGroup>
              <FormGroup className="form-group">
                <Col xs={12} sm={8} md={9}>
                  <Input
                    id='privKey'
                    onBlur={handleBlur}
                    value={values.privKey}
                    onChange={handleChange}
                    invalid={errors.privKey && touched.privKey}
                    type="text"
                    placeholder="Enter Private key"
                    className="form-control input-home"/>
                </Col>
                <Col xs={12} sm={4} md={3}>
                  <Button type="submit" color='secondary' className="btn-home">Unlock</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>

      <div className="fs-footer">
          <span className="badge badge-fs bold">v0.01</span> Part of the FeeSimple network.
          <span className="created-by">Crafted by <a href="" className="p-l-10"><img src={OpenReLogoLarge} alt="logo" width="110"/></a></span>
      </div>
    </div>
  )
}

const EnhancedLoginForm = withFormik({
  mapPropsToValues: () => ({ privKey: '' }),
  validate: values => {
    let errors = {}
    if (!values.privKey) {
      errors.privKey = 'Required'
    } else if (values.privKey.length !== 51) {
      errors.privKey = 'Invalid private key'
    }
    return errors
  },

  handleSubmit: ({ privKey }, { props }) => {
    props.handleImportPrivKey(privKey)
  },

  displayName: 'LoginForm' // helps with React DevTools
})(LoginForm)

export default EnhancedLoginForm
