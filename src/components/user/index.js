import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ERR_DATA_LOADING_FAILED } from '../../utils/error'
import IconInfo from '../../img/info.svg'
import SendModal from './modals/SendModal'
import ManageResourcesModal from './modals/ManageResourcesModal'

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import {
  getAccountInfo,
  manageCpuBw,
  manageRam,
  getActionsProcessed
} from '../../utils/eoshelper'
import { User } from './User'
import { Button, Col, Row, Container } from 'reactstrap'

class UserContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,

      showModalResource: false,
      isBuy: false,
      isProcessingRam: false,
      resourceHandleErrRam: false,

      activityList: [],
      gettingActions: true
    }
  }

  handleToggleModalResource = () => {
    const { showModalResource } = this.state
    this.setState({
      showModalResource: !showModalResource
    })

    this.resetProcessing()

    // Update account info
    this.updateAccountInfo()

    this.handleGetActions()
  }

  handleGetActions = async () => {
    let currActivityList = this.state.activityList

    this.setState({
      gettingActions: true
    })

    const { eosClient, accountData } = this.props
    let activeAccount = accountData.active

    let res = await getActionsProcessed(eosClient, activeAccount)
    if (res.errMsg || res.length === 0) {
      if (currActivityList.length === 0) {
        this.setState({
          activityList: []
        })
      }
    } else {
      this.setState({
        activityList: res
      })
    }

    this.setState({
      gettingActions: false
    })
  }

  updateAccountInfo = async () => {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    let info = await getAccountInfo(eosClient, account)
    this.setState({
      data: info
    })
  }

  resetProcessing = () => {
    this.setState({
      resourceHandleErrRam: false,
      isProcessingRam: false
    })
  }

  setBuy = () => {
    this.setState({
      isBuy: true
    })

    this.resetProcessing()
  }

  setSell = () => {
    this.setState({
      isBuy: false
    })

    this.resetProcessing()
  }

  handleManageRam = async xfsAmount => {
    // Reset state
    this.setState({
      resourceHandleErrRam: false,
      isProcessingRam: true
    })

    const { eosClient, accountData } = this.props
    let activeAccount = accountData.active
    let ramPrice = this.state.data.ramPrice
    let isBuy = this.state.isBuy
    let res = await manageRam(
      eosClient,
      activeAccount,
      xfsAmount,
      ramPrice,
      isBuy,
      this.state.data.ramAvailable
    )
    if (res.errMsg) {
      this.setState({
        resourceHandleErrRam: res.errMsg,
        isProcessingRam: false
      })
    } else {
      this.setState({
        resourceHandleErrRam: 'Success',
        isProcessingRam: false
      })
    }
  }

  async componentDidMount () {
    await this.updateAccountInfo()

    // Time-consuming handling
    this._asyncRequest = this.handleGetActions().then(() => {
      this._asyncRequest = null
    })
  }

  componentWillUnmount () {
    if (this.state.gettingActions) {
      this._asyncRequest = null
    }
  }

  render () {
    const user = this.state.data
    if (!user) {
      // You can render any custom fallback UI
      // return <h1 className='error-message'>{ERR_DATA_LOADING_FAILED}</h1>
      return <div />
    }
    return (
      <div>
        <div className='top-bar'>
          <Container>
            <Row>
              <Col>
                <h3 className='float-left'>Wallet</h3>
              </Col>
              <Col className='col-md-4'>
                <h4 className='wallet-info-h4'>
                  Total Balance
                  <div className='wallet-info wattet-info-top'>
                    <img src={IconInfo} alt='' />
                    <div className='info-content'>
                      <div className='ms-arrow_box'>
                        <span>{user.balance} available</span>
                        <span>{user.stakedBalanceNumber} XFS staked</span>
                      </div>
                    </div>
                  </div>
                </h4>
                <h3 className='float-right mt-0'>
                  {' '}
                  {user.totalBalanceNumber} XFS
                </h3>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col className='m-t-15'>
              <div className='floor-btns'>
                <SendModal
                  user={user}
                  updateAccountInfo={this.updateAccountInfo}
                />
              </div>

              <button
                type='button'
                className='btn btn-outline-primary fr m-l-10'
                onClick={this.handleToggleModalResource}
              >
                {' '}
                Manage Resources
              </button>

              <ManageResourcesModal
                modal={this.state.showModalResource}
                toggle={this.handleToggleModalResource}
                user={user}
                userStakedBalance={user.stakedBalanceNumber}
                userBalance={user.balanceNumber}
                updateAccountInfo={this.updateAccountInfo}
                isBuy={this.state.isBuy}
                setBuy={this.setBuy}
                setSell={this.setSell}
                handleManageRam={this.handleManageRam}
                isProcessingRam={this.state.isProcessingRam}
                resourceHandleErrRam={this.state.resourceHandleErrRam}
              />
            </Col>
          </Row>
        </Container>
        <div>
          <Container>
            <User
              user={user}
              activityList={this.state.activityList}
              gettingActions={this.state.gettingActions}
            />
          </Container>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ eosClient, accountData }) {
  return { eosClient, accountData }
}

export default withRouter(connect(mapStateToProps)(UserContainer))
