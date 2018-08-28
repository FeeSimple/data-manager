import React, { Component } from 'react'
import Login from './Login'
import ecc from 'eosjs-ecc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class LoginContainer extends Component {
  handleImportPrivKey = (privKey) => {
    const pubKey = ecc.privateToPublic(privKey)
    const  eosClient  = this.props.eosClient.instance
    eosClient.getKeyAccounts(pubKey).then(result => console.info(result))    

    //https://github.com/FeeSimple/wallet-web-eoswalletpro/blob/a58c4562865336a8ba3bcedc98078e0a88ab9364/app.js#L64
  }

  handleScatterClick = () => {
    console.info('scatter clicked')
  }

  render () {
    return (
      <Login 
        handleImportPrivKey={this.handleImportPrivKey} 
        onScatterClick={this.handleScatterClick}
      />
    )
  }
}

function mapStateToProps({ eosClient }){
  return { eosClient }
}

export default withRouter(connect(
  mapStateToProps
)(LoginContainer))
