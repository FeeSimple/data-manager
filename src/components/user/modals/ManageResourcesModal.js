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
      subModal: 'stake',
      'active': 0
    }
  }

  setActive( index ) {
    this.setState({ 'active': index });
  }

  handleToggleSubModal = subModal => {
    //console.log('handleToggleSubModal - subModal:', subModal)
    if (subModal !== this.state.subModal) {
      this.setState({
        subModal
      })
    }
  }

  render () {
    var current = this.state.active;
    var getClass = function(index) {
        if ( index === current )
          return 'active';
          return '';
    };
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
              <ul className='manageModalUl'>
                <li onClick={this.setActive.bind(this, 0)} className={getClass(0)}>
                  <button
                    type='button'
                    color=''
                    className='btn'
                    onClick={() => this.handleToggleSubModal('stake')}
                  >
                    {' '}
                    Stake
                  </button>
                </li>
                <li onClick={this.setActive.bind(this, 1)} className={getClass(1)}>
                  <button
                    type='button'
                    color=''
                    className='btn'
                    onClick={() => this.handleToggleSubModal('unstake')}
                  >
                    {' '}
                    Unstake
                  </button>
                </li>
                <li onClick={this.setActive.bind(this, 2)} className={getClass(2)}>
                  <button
                    type='button'
                    color=''
                    className='btn'
                    onClick={() => this.handleToggleSubModal('ram')}
                  >
                    {' '}
                    RAM
                  </button>
                </li>
              </ul>
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
