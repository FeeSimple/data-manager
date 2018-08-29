import React, { Component } from 'react'
import Login from './Login'
import ecc from 'eosjs-ecc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SelectAcc from './SelectAcc'
import { PROPERTY, FSMGRCONTRACT } from '../../utils/consts'
import { getImportedKeyEos, getNetworkData } from '../../utils/index'
import Eos from 'eosjs'
import { 
  setActive, 
  setInfo, 
  addProperties, 
  setFsMgrContract, 
  setEosClient ,
  setScatter
} from '../../actions/index'

class LoginContainer extends Component {
  state={
    showSelectAccModal: false,
    availableAccounts: [],
    privKey: null
  }

  handleImportPrivKey = (privKey) => {
    const pubKey = ecc.privateToPublic(privKey)
    const  { eosClient }  = this.props    

    eosClient.getKeyAccounts(pubKey).then(result => {
      this.setState({
        availableAccounts: result.account_names,
        privKey
      })
      this.handleToggleSelAcc()
    })    
  }

  handleScatterClick = async () => {
    const { 
      scatter,
      setScatter,
      setEosClient, 
      addProperties, 
      setFsMgrContract,
      setActive
    } = this.props
    if(!scatter){
      console.info('no scatter detected.')
      return
    }

    const network = getNetworkData()
    const identity = await scatter.getIdentity({ accounts: [network] })
    const account = identity.accounts.find(account => account.blockchain === 'eos')
    setActive(account.name)
    
    const eosClient = scatter.eos(network, Eos, {}, 'https')
    setScatter(scatter)
    setEosClient(eosClient)

    const { rows } = await eosClient.getTableRows(
      true,
      FSMGRCONTRACT,
      account.name,
      PROPERTY
    )
    addProperties(rows)
    setFsMgrContract(await eosClient.contract(FSMGRCONTRACT))
  }

  handleSelectAcc = (account) => {
    const { 
      setActive, 
      setInfo,
      addProperties, 
      setFsMgrContract,
      setEosClient 
    } = this.props

    const { privKey } = this.state
    const eosClient = getImportedKeyEos(Eos,privKey)
    
    setActive(account)
    setEosClient(eosClient)
    eosClient.getAccount(account).then(async result => {
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
      
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        info.account,
        PROPERTY
      )
      
      addProperties(rows)      
      setFsMgrContract(await eosClient.contract(FSMGRCONTRACT))
      
    })
    this.handleToggleSelAcc()
  }

  handleToggleSelAcc = () => {
    const { showSelectAccModal } = this.state
    this.setState({showSelectAccModal: !showSelectAccModal})
  }

  render () {
    const accounts = this.state.availableAccounts
    const { scatter } = this.props    
    return (
      <div>
        <Login 
          handleImportPrivKey={this.handleImportPrivKey} 
          onScatterClick={this.handleScatterClick}
          scatterDetected={Object.keys(scatter).length > 0}
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

function mapStateToProps({ eosClient, scatter }){
  return { eosClient, scatter }
}

export default withRouter(connect(
  mapStateToProps,
  { setActive, setInfo, addProperties, setFsMgrContract, setEosClient, setScatter }
)(LoginContainer))
