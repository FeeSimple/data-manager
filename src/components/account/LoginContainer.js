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
  setLoading,
  setOpResult
} from '../../actions/index'
import getScatterAsync from '../../utils/getScatterAsync'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'

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
    isProcessing: false,
    usingScatter: false
  }

  handleImportPrivKey = privKey => {
    const pubKey = ecc.privateToPublic(privKey)
    const { eosClient } = this.props

    eosClient.getKeyAccounts(pubKey).then(result => {
      this.setState({
        availableAccounts: result.account_names,
        privKey,
        usingScatter: false
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
    this.setState({
      isProcessing: true
    })
    let { scatter, eos } = await getScatterAsync()
    this.setState({
      isProcessing: false
    })
    if (!scatter) {
      this.props.setOpResult({
        show: true,
        title: 'Scatter Desktop not available',
        text: 'Please run Scatter Desktop',
        type: 'error'
      })
      return
    }
    setScatter(scatter)
    setEosClient(eos)
    const network = getNetworkData()
    const identity = await scatter.getIdentity({ accounts: [network] })
    const availableAccounts = identity.accounts
      .filter(account => account.blockchain === 'eos')
      .map(account => account.name)

    this.setState({
      availableAccounts,
      usingScatter: true,
      privKey: null
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

    let eosClient = null
    setLoading(true)

    if (this.state.usingScatter) {
      eosClient = this.props.eosClient
    } else {
      const { privKey } = this.state
      eosClient = getImportedKeyEos(Eos, privKey)
    }

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
        privKey: this.state.usingScatter ? null : this.state.privKey,
        usingScatter: this.state.usingScatter
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
    this.setState({
      showNewAccModal: !showNewAccModal,
      isOpenKeyPair: false
    })
  }

  handleOnConfirm = () => {
    this.props.setOpResult({
      show: false,
      title: '',
      text: '',
      type: 'error'
    })
  }

  render () {
    const accounts = this.state.availableAccounts
    const { scatter, opResult } = this.props
    return (
      <div>
        <Login
          handleImportPrivKey={this.handleImportPrivKey}
          onScatterClick={this.handleScatterClick}
          onNewAccountClick={this.handleNewAccountClick}
          isProcessing={this.state.isProcessing}
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
        {opResult && opResult.data && (
          <SweetAlert
            show={opResult.data.show}
            type={opResult.data.type}
            title={opResult.data.title}
            text={opResult.data.text}
            onConfirm={this.handleOnConfirm}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, scatter, opResult }) {
  return { eosClient, scatter, opResult }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      setActive,
      setInfo,
      addProperties,
      setFsMgrContract,
      setEosClient,
      setScatter,
      setLoading,
      setOpResult
    }
  )(LoginContainer)
)
