import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Collapse,
  Alert
} from 'reactstrap'
import UserSend from '../UserSend'
import { sendXFSWithCheck } from '../../../utils/eoshelper'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class SendModalContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      userSendErr: false,
      isProcessing: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState(prevState => ({
      modal: !prevState.modal,
      userSendErr: false
    }))
  }

  handleUserSend = async (receivingAccount, xfsAmount, memo) => {
    // Reset state
    this.setState({
      userSendErr: false,
      isProcessing: true
    })

    const { eosClient, accountData, user, updateAccountInfo, handleGetActions } = this.props
    let activeAccount = accountData.active

    let err = await sendXFSWithCheck(
      eosClient,
      activeAccount,
      receivingAccount,
      xfsAmount,
      memo,
      user
    )

    if (err) {
      this.setState({
        userSendErr: err,
        isProcessing: false
      })
    } else {
      updateAccountInfo()
      
      handleGetActions()

      this.setState({
        userSendErr: 'Success',
        isProcessing: false
      })
    }
  }

  render () {
    const { user } = this.props

    return (
      <>
        <Button
          color='base'
          className='btn prop-btn m-l-5'
          onClick={this.toggle}
        >
          Send
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <div className='fs-16 clr-base tc'>Send XFS</div>
          </ModalHeader>
          <ModalBody>
            <div className='tc'>
              <Collapse isOpen={this.state.userSendErr} size='sm'>
                {this.state.userSendErr === 'Success' ? (
                  <Alert color='success'>
                    <div>
                      <div>
                        <b>Transaction successful!</b>
                      </div>
                      <div>Your XFS balance has been updated.</div>
                    </div>
                  </Alert>
                ) : (
                  <Alert color='danger'>
                    {<div>this.state.userSendErr</div>}
                  </Alert>
                )}
              </Collapse>
            </div>
            <div className='tc m-b-30'>
              Send XFS to another FeeSimple account
            </div>
            <UserSend
              user={user}
              handleUserSend={this.handleUserSend}
              userSendErr={this.state.userSendErr}
              isProcessing={this.state.isProcessing}
              toggle={this.toggle}
            />
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function mapStateToProps ({ eosClient, accountData }) {
  return { eosClient, accountData }
}

export default withRouter(connect(mapStateToProps)(SendModalContainer))
