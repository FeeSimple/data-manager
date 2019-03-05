import React, { Component } from 'react'
import Login from './Login'
import ecc from 'eosjs-ecc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PROPERTY, FSMGRCONTRACT } from '../../utils/consts'
import {
  getImportedKeyEos,
  getNetworkData,
  eosAdminAccount,
  getEosAdmin
} from '../../utils/index'
import Eos from 'eosjs'
import SelectAcc from './SelectAcc'
import NewAcc from './NewAcc'
import { createNewAccount } from '../../utils/eoshelper'
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
  state = {
    showSelectAccModal: false,
    showNewAccModal: false,
    isOpenKeyPair: false,
    availableAccounts: [],
    privKey: null,
    accountPubKey: '',
    accountPrivKey: '',
    newAccountCreationErr: false,
    isProcessing: false
  }

  handleImportPrivKey = privKey => {
    const pubKey = ecc.privateToPublic(privKey)
    const { eosClient } = this.props

    eosClient.getKeyAccounts(pubKey).then(result => {
      this.setState({
        availableAccounts: result.account_names,
        privKey
      })
      this.handleToggleSelAcc()
    })
  }

  handleCleanup = () => {
    this.setState({
      accountPubKey: '',
      accountPrivKey: '',
      newAccountCreationErr: ''
    })
    console.log('handleCleanup:', this.state.newAccountCreationErr)
  }

  handleCreateNewAccount = async accountName => {
    // Reset state
    this.setState({
      isOpenKeyPair: false,
      accountPubKey: '',
      accountPrivKey: '',
      newAccountCreationErr: false,
      isProcessing: true
    })

    const eosAdmin = getEosAdmin(Eos)
    let res = await createNewAccount(
      eosAdmin,
      accountName,
      eosAdminAccount.name
    )

    if (res.errMsg) {
      this.setState({
        isOpenKeyPair: false,
        accountPubKey: '',
        accountPrivKey: '',
        newAccountCreationErr: res.errMsg,
        isProcessing: false
      })
    } else {
      this.setState({
        isOpenKeyPair: true,
        accountPubKey: res.accountPubKey,
        accountPrivKey: res.accountPrivKey,
        newAccountCreationErr: false,
        isProcessing: false
      })
    }
  }

  handleScatterClick = async () => {
    const { scatter } = this.props
    if (!scatter) {
      console.info('no scatter detected.')
      return
    }
    const network = getNetworkData()
    const identity = await scatter.getIdentity({ accounts: [network] })
    const availableAccounts = identity.accounts
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

  handleSelectAcc = async account => {
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

    if (this.state.usingScatter) {
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
    eosClient = getImportedKeyEos(Eos, privKey)

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
        pubkey,
        privKey
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
    this.setState({ showSelectAccModal: !showSelectAccModal })
  }

  handleToggleNewAcc = () => {
    const { showNewAccModal } = this.state
    this.setState({ showNewAccModal: !showNewAccModal })
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
          isOpenKeyPair={this.state.isOpenKeyPair}
          handleCreateNewAccount={this.handleCreateNewAccount}
          handleCleanup={this.handleCleanup}
          accountPubKey={this.state.accountPubKey}
          accountPrivKey={this.state.accountPrivKey}
          newAccountCreationErr={this.state.newAccountCreationErr}
          isProcessing={this.state.isProcessing}
        />
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, scatter }) {
  return { eosClient, scatter }
}

export default withRouter(
  connect(mapStateToProps, {
    setActive,
    setInfo,
    addProperties,
    setFsMgrContract,
    setEosClient,
    setScatter,
    setLoading
  })(LoginContainer)
)
