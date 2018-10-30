import React from 'react'
import LogoLarge from '../../img/logo-large.svg'
import OpenReLogoWhite from '../../img/openre-logo-white.svg'
import { withFormik } from 'formik'
import {
  Button,
  Input,
  Container,
  Row,
  Col,
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
    onNewAccountClick,
    scatterDetected
  } = props

  return (
    <div className="main-wrapper home">
      <Container>
        <Row>
          <Col md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2}}>
            <Form onSubmit={handleSubmit} className="home-form" >
              <div className="form-group row">
                <Col xs={12} className="text-center">
                  <a href="" className="logo-container">
                    <img src={LogoLarge} width="370" alt="Logo"/>
                  </a>
                </Col>
              </div>
              <div className="form-group row">
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
                  <Button 
                    onClick={onNewAccountClick} 
                    className="btn-base btn-home"
                  >
                    Create a New Account
                  </Button>
                </Col>
              </div>
              <div className="form-group row">
                <Col md={8} lg={9}>
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
                <Col md={4} lg={3}>
                  <Button type="submit" color='secondary' className="btn-home">Unlock</Button>
                </Col>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <div className="fs-footer">
          <span className="badge badge-fs bold">v0.01</span> Part of the FeeSimple network.
          <span className="created-by">{' '}Crafted by <a href="" className="p-l-10"><img src={OpenReLogoWhite} alt="logo" width="110"/></a></span>
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
