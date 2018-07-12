import React from 'react'
import { withRouter } from 'react-router'
import { Container } from 'reactstrap'
import Properties from './Properties'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import getScatter from '../utils/getScatter'
import EOSClient from '../utils/eos-client';
import { setScatter, addProperties } from '../actions'

class AppContainer extends React.Component{  
  state = {
    eosClient: null
  }

  componentWillMount () {    
    const { setScatter } = this.props
    getScatter.then((results) => {
      const { scatter } = results
      setScatter(scatter)
    }).catch((error) => {
      console.error('Error setting up scatter.', error)
    })

    this.setState({eosClient: new EOSClient('fsmgrcode333','fsmgrcode333')})
  }

  componentDidMount () {    
    const { addProperties } = this.props
    const { eosClient } = this.state

    eosClient
      .getTableRows('property')
      .then(data => {
        console.log(data);
        addProperties(data.rows)
      })
      .catch(e => {
        console.error(e);
      });
  }

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

function mapStateToProps ({ scatter }) {
  return { scatter }
}

export default withRouter(connect(
  mapStateToProps,
  { setScatter, addProperties }
)(AppContainer))