import React, { Component } from 'react'
import Login from './Login'
import ecc from 'eosjs-ecc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SelectAcc from './SelectAcc'
import { setActive, setInfo } from '../../actions/index'

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
    const { setActive, setInfo, eosClient } = this.props
    setActive(account)
    eosClient.getAccount(account).then(result => {
      const created = result.created
      const ram = result.ram_quota
      const bandwidth = result.delegated_bandwidth
      const pubkey = result.permissions[0].required_auth.keys[0].key
      const info = {
        account, 
        created, 
        ram, 
        bandwidth,
        pubkey
      }

      setInfo(info)
    })
  }

  handleToggleSelAcc = () => {
    const { showSelectAccModal } = this.state
    this.setState({showSelectAccModal: !showSelectAccModal})
  }

  render () {
    const accounts = this.state.availableAccounts    
    return (
      <div>
        <Login 
          handleImportPrivKey={this.handleImportPrivKey} 
          onScatterClick={this.handleScatterClick}
        />
        <SelectAcc 
          isOpen={this.state.showSelectAccModal}
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
  mapStateToProps,
  { setActive, setInfo }
)(LoginContainer))
