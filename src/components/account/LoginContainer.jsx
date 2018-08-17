import React, { Component } from 'react'
import Login from './Login'

export default class LoginContainer extends Component {
  handleImportPrivKey (privKey) {
    console.info('got key:', privKey)
  }

  render () {
    return <Login handleImportPrivKey={this.handleImportPrivKey}/>
  }
}
