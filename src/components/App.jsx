import React from 'react'
import { withRouter } from 'react-router'
import { Container } from 'reactstrap'
import Properties from './Properties'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import getScatter from '../utils/getScatter'
import * as Eos from 'eosjs'
import { 
  setScatter,
  setEosJs   
} from '../actions'

class AppContainer extends React.Component{
  
  componentWillMount () {    
    const { setScatter, setEosJs } = this.props
    getScatter.then((results) => {
      const { scatter } = results
      setScatter(scatter)
    }).catch((error) => {
      console.error('Error setting up scatter.', error)
    })

    // Define the account used to deploy the contract.
    // This account will be used to reference the contract.
    const contractAccount = {
      name: 'useraaaaaaaa',
      privKey: '5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr'
    }

    // Define the local nodeos endpoint connected to the remote testnet blockchain
    const localNodeos = 'http://127.0.0.1:8877'

    // Basic configuration of the EOS client
    const config = {
      chainId: '1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32',
      keyProvider: contractAccount.privKey,
      httpEndpoint: localNodeos,

      expireInSeconds: 60,
      broadcast: true,
      debug: false, // set to true for debugging the transaction
      sign: true
    }

    // Instantiate the EOS client used for blockchain/contract interaction
    const eosClient = EOS(config)

    setEosJs(eosClient)
    eosClient.getTableRows('todos', 'todo', 'todo').then((data) => {
      console.info('data',data)
    }).catch((e) => {
      console.error(e);
    })
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
  { setScatter, setEosJs }
)(AppContainer))