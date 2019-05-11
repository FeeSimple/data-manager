import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ERR_DATA_LOADING_FAILED } from '../../utils/error'
import SendModal from './modals/SendModal'
import StakeModal from './modals/StakeModal'
import UnstakeModal from './modals/UnstakeModal'
import ManageRamModal from './modals/ManageRamModal'
import Select from 'react-select'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import {
  getAccountInfo,
  manageRam,
  manageCpuBw,
  getActionsProcessed
} from '../../utils/eoshelper'
import { User } from './User'
import { Button, Col, Row, Container } from 'reactstrap'

class UserContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,

      showModalRam: false,
      showModalStake: false,
      showModalUnstake: false,

      isBuy: false,
      resourceHandleErr: false,
      isProcessing: false,
      activityList: [],
      gettingActions: true,

      balanceList: [],
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  resetProcessing = () => {
    this.setState({
      resourceHandleErr: false,
      isProcessing: false
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

  handleToggleModalStake = () => {
    const { showModalStake } = this.state
    this.setState({
      showModalStake: !showModalStake
    })

    this.resetProcessing()
  }

  handleToggleModalUnstake = () => {
    const { showModalUnstake } = this.state
    this.setState({
      showModalUnstake: !showModalUnstake
    })

    this.resetProcessing()
  }

  handleToggleModalRam = () => {
    const { showModalRam } = this.state
    this.setState({
      showModalRam: !showModalRam
    })

    this.resetProcessing()

    
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

  handleManageRam = async xfsAmount => {
    // Reset state
    this.setState({
      resourceHandleErr: false,
      isProcessing: true
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
        resourceHandleErr: res.errMsg,
        isProcessing: false
      })
    } else {
      // Update account info
      this.updateAccountInfo()

      this.setState({
        resourceHandleErr: 'Success',
        isProcessing: false
      })
    }
  }

  updateAccountInfo = async () => {
    const { eosClient, accountData } = this.props
    let account = accountData.active
    let info = await getAccountInfo(eosClient, account)
    this.setState({
      data: info,
      balanceList: [
        { label: `Spendable Balance: ${info.balance}`, value: 1 },
        { label: `Staked Balance: ${info.stakedBalanceNumber} XFS`, value: 2 },
        { label: `Total Balance: ${info.totalBalanceNumber} XFS`, value: 3 }
      ]
    })
    this.handleGetActions()
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
              <Col className='col-md-4' style={{ fontSize: '18px' }}>
                {user && (
                  <Select
                    defaultValue={this.state.balanceList[0]}
                    options={this.state.balanceList}
                  />
                )}
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

              <Button
                color='gray'
                className='btn prop-btn fr m-l-10'
                onClick={this.handleToggleModalRam}
              >
                {' '}
                RAM
              </Button>

              <ManageRamModal
                user={user}
                showModalRam={this.state.showModalRam}
                handleToggleModalRam={this.handleToggleModalRam}
                handleManageRam={this.handleManageRam}
                isBuy={this.state.isBuy}
                setBuy={this.setBuy}
                setSell={this.setSell}
                isProcessing={this.state.isProcessing}
                resourceHandleErr={this.state.resourceHandleErr}
              />

              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                className='prop-btn fr m-l-10'
              >
                <DropdownToggle caret color='gray'>
                  Stake/Unstake
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Button
                      color='gray'
                      className='btn prop-btn fr m-l-10'
                      onClick={this.handleToggleModalStake}
                    >
                      Stake
                    </Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button
                      color='gray'
                      className='btn prop-btn fr m-l-10'
                      onClick={this.handleToggleModalUnstake}
                    >
                      Unstake
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <UnstakeModal
                userStakedBalance={user.stakedBalanceNumber}
                updateAccountInfo={this.updateAccountInfo}
                toggle={this.handleToggleModalUnstake}
                modal={this.state.showModalUnstake}
              />

              <StakeModal
                userBalance={user.balanceNumber}
                updateAccountInfo={this.updateAccountInfo}
                toggle={this.handleToggleModalStake}
                modal={this.state.showModalStake}
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
