import React from 'react'
import { withRouter } from 'react-router'
import { Container } from 'reactstrap'
import Properties from './properties/Properties'
import LoginContainer from './account/LoginContainer'
import Navbar from './layout/Navbar'
import { connect } from 'react-redux'
import { setScatter, addProperties, setEosClient } from '../actions'

class AppContainer extends React.Component {
  render () {
    return (
      <div className='fsapp'>
        <Navbar />
        <Container>
          {this.props.eosClient.locked === true && <LoginContainer />}
          {this.props.eosClient.locked !== true && <Properties />}
          
        </Container>
      </div>
    )
  }
}

function mapStateToProps ({ scatter, eosClient }) {
  return { scatter, eosClient }
}

export default withRouter(connect(
  mapStateToProps,
  { setScatter, addProperties, setEosClient }
)(AppContainer))
