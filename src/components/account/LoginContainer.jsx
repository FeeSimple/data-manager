import React, { Component } from 'react'
import Login from './Login'
import ecc from 'eosjs-ecc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SelectAcc from './SelectAcc'

class LoginContainer extends Component {
  state={
    showSelectAccModal: false,
    availableAccounts: []
  }

  handleImportPrivKey = (privKey) => {
    const pubKey = ecc.privateToPublic(privKey)
    const  { eosClient }  = this.props
    eosClient.getKeyAccounts(pubKey).then(result => {
      console.info(result)
      this.setState({availableAccounts: result.account_names})
      this.handleToggleSelAcc()
    })
    
  }

  handleScatterClick = () => {
    console.info('scatter clicked')
  }

  handleSelectAcc = (account) => {
    console.info('selected account: ',account)
    //https://github.com/FeeSimple/wallet-web-eoswalletpro/blob/a58c4562865336a8ba3bcedc98078e0a88ab9364/app.js#L64
  }

  handleToggleSelAcc = () => {
    const { showSelectAccModal } = this.state
    this.setState({showSelectAccModal: !showSelectAccModal})
  }

  render () {
    // const accounts = this.state.availableAccounts
    const accounts = ['asdf','asfff']
    return (
      <div>
        <Login 
          handleImportPrivKey={this.handleImportPrivKey} 
          onScatterClick={this.handleScatterClick}
        />
        <SelectAcc 
          // isOpen={this.state.showSelectAccModal}
          isOpen={true}
          handleToggle={this.handleToggleSelAcc}
          onAccountSelect={this.handleSelectAcc}
          accounts={accounts}
        />
      </div>
    )
  }
}

function mapStateToProps({ eosClient }){
  return { eosClient }
}

export default withRouter(connect(
  mapStateToProps
)(LoginContainer))
