import React from 'react'
import { withRouter } from 'react-router'
import { Container } from 'reactstrap'
import Properties from './Properties'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { setScatter, addProperties, setEosClient } from '../actions'

class AppContainer extends React.Component{
  render(){
    return App()
  }
}

const App = () => (
  <div>
    <Navbar />
    <Container>
      <Properties />
    </Container>
  </div>
)

function mapStateToProps ({ scatter, eosClient }) {
  return { scatter, eosClient }
}

export default withRouter(connect(
  mapStateToProps,
  { setScatter, addProperties, setEosClient }
)(AppContainer))