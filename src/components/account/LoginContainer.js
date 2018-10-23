import React, { Component } from 'react'
import Login from './Login'
import ecc from 'eosjs-ecc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PROPERTY, FSMGRCONTRACT } from '../../utils/consts'
import { getImportedKeyEos, getNetworkData } from '../../utils/index'
import Eos from 'eosjs'
import SelectAcc from './SelectAcc'
import NewAcc from './NewAcc'
import {
  setActive,
  setInfo,
  addProperties,
  setFsMgrContract,
  setEosClient,
  setScatter,
  setLoading
} from '../../actions/index'

class LoginContainer extends Component {
  state={
    showSelectAccModal: false,
    showNewAccModal: false,
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
    const { scatter } = this.props
    if(!scatter){
      console.info('no scatter detected.')
      return
    }
    const network = getNetworkData()
    const identity = await scatter.getIdentity({ accounts: [network] })
    const availableAccounts = identity
      .accounts
      .filter(account => account.blockchain === 'eos')
      .map(account => account.name)

    this.setState({
      availableAccounts,
      usingScatter: true
    })
    this.handleToggleSelAcc()
  }

  handleNewAccountClick = async () => {
    
    this.handleToggleNewAcc()
  }

  handleSelectAcc = async (account) => {
    const {
      setActive,
      setInfo,
      addProperties,
      setFsMgrContract,
      setEosClient,
      setLoading,
      scatter
    } = this.props

    let { eosClient } = this.props
    setLoading(true)

    if(this.state.usingScatter){
      const network = getNetworkData()
      eosClient = scatter.eos(network, Eos, {}, 'https')
      setActive(account)
      setScatter(scatter)
      setEosClient(eosClient)

      setFsMgrContract(await eosClient.contract(FSMGRCONTRACT))
      const { rows } = await eosClient.getTableRows(
        true,
        FSMGRCONTRACT,
        account,
        PROPERTY
      )
      addProperties(rows)
      setLoading(false)
      return
    }

    const { privKey } = this.state
    eosClient = getImportedKeyEos(Eos,privKey)

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
      setLoading(false)
    })
    this.handleToggleSelAcc()
  }

  handleToggleSelAcc = () => {
    const { showSelectAccModal } = this.state
    this.setState({showSelectAccModal: !showSelectAccModal})
  }

  handleToggleNewAcc = () => {
    const { showNewAccModal } = this.state
    this.setState({showNewAccModal: !showNewAccModal})
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
          onNewAccountClick={this.handleNewAccountClick}
        />
        <SelectAcc
          isOpen={this.state.showSelectAccModal}
          handleToggle={this.handleToggleSelAcc}
          onAccountSelect={this.handleSelectAcc}
          accounts={accounts}
        />
        <NewAcc
          isOpen={this.state.showNewAccModal}
          handleToggle={this.handleToggleNewAcc}
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
  {
    setActive,
    setInfo,
    addProperties,
    setFsMgrContract,
    setEosClient,
    setScatter,
    setLoading
  }
)(LoginContainer))
