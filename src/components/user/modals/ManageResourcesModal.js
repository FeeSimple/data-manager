import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Collapse,
  Alert
} from 'reactstrap'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Spinner from 'react-spinkit'
import { manageCpuBw } from '../../../utils/eoshelper'
import StakeModalBody from './StakeModalBody'
import UnstakeModalBody from './UnstakeModalBody'
import RamModalBody from './RamModalBody'

class ManageResourcesModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subModal: 'unstake'
    }
  }

  handleToggleSubModal = subModal => {
    console.log('handleToggleSubModal - subModal:', subModal)
    if (subModal !== this.state.subModal) {
      this.setState({
        subModal
      })
    }
  }

  render () {
    const { subModal } = this.state
    const {
      userBalance,
      userStakedBalance,
      user,
      updateAccountInfo,
      toggle,
      modal,
      isBuy,
      setBuy,
      setSell,
      resourceHandleErrRam,
      isProcessingRam,
      handleManageRam
    } = this.props

    return (
      <Modal isOpen={modal} className={this.props.className}>
        <ModalHeader toggle={toggle}>
          <div className='fs-16 clr-base tc'>Manage Resources</div>
        </ModalHeader>
        <ModalBody className='px-5'>
          <Row>
            <Col>
              <button
                type='button'
                color='gray'
                className='btn prop-btn fr m-l-10'
                onClick={() => this.handleToggleSubModal('stake')}
              >
                {' '}
                Stake
              </button>
            </Col>
            <Col>
              <button
                type='button'
                color='gray'
                className='btn prop-btn fr m-l-10'
                onClick={() => this.handleToggleSubModal('unstake')}
              >
                {' '}
                Unstake
              </button>
            </Col>
            <Col>
              <Button
                color='base'
                className='btn prop-btn fr m-l-10'
                onClick={() => this.handleToggleSubModal('ram')}
              >
                {' '}
                RAM
              </Button>
            </Col>
          </Row>
        </ModalBody>

        {subModal === 'stake' && (
          <StakeModalBody
            userBalance={userBalance}
            updateAccountInfo={updateAccountInfo}
          />
        )}

        {subModal === 'unstake' && (
          <UnstakeModalBody
            userStakedBalance={userStakedBalance}
            updateAccountInfo={updateAccountInfo}
          />
        )}

        {subModal === 'ram' && (
          <RamModalBody
            user={user}
            setBuy={setBuy}
            setSell={setSell}
            isBuy={isBuy}
            updateAccountInfo={updateAccountInfo}
            handleManageRam={handleManageRam}
            resourceHandleErr={resourceHandleErrRam}
            isProcessing={isProcessingRam}
          />
        )}
      </Modal>
    )
  }
}

function mapStateToProps ({ eosClient, accountData }) {
  return { eosClient, accountData }
}

export default withRouter(connect(mapStateToProps)(ManageResourcesModal))
