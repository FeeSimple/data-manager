import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Collapse,
  Alert
} from 'reactstrap'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Spinner from 'react-spinkit'

class StakeModalContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      value: 65
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  handleChangeStart = () => {
    //console.log('Change event started')
  }
  handleChange = value => {
    this.setState({
      value: value
    })
  }
  handleChangeComplete = () => {}

  render () {
    const { value } = this.state
    const {
      userBalance,
      handleSetStake,
      isProcessing,
      resourceHandleErr
    } = this.props
    return (
      <>
        <Button color='gray' className='btn prop-btn fr' onClick={this.toggle}>
          Stake
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <div className='fs-16 clr-base tc'>Manage Stake</div>
          </ModalHeader>
          <ModalBody>
            <div className='tc m-b-30'>
              <Collapse isOpen={resourceHandleErr} size='sm'>
                {resourceHandleErr === 'Success' ? (
                  <Alert color='success'>
                    <div>
                      <div>
                        <b>Successful staking!</b>
                      </div>
                      <div>
                        {(
                          (parseInt(value) * parseFloat(userBalance)) /
                          100
                        ).toFixed(4)}{' '}
                        XFS has been deducted
                      </div>
                      <div>from your balance</div>
                    </div>
                  </Alert>
                ) : (
                  <Alert color='danger'>{resourceHandleErr}</Alert>
                )}
              </Collapse>
            </div>
            <div className='tc m-b-30'>
              To gain additional resources, adjust the amount of <br /> XFS you
              would like to stake:
            </div>

            <h2 className='stackvalueRange'>{value}%</h2>
            {userBalance &&
              <h4 className='stackvalue'>
                {new Intl.NumberFormat().format((value * userBalance) / 100)}{' '} XFS
              </h4>
            }
            <from>
              <div className='form-group row'>
                <div className='col-12'>
                  <div className='form-group'>
                    <div className='slider'>
                      <Slider
                        min={0}
                        max={100}
                        value={value}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-4'>
                      <span className='rangeVal'>0%</span>
                    </div>
                    <div className='col-4 a-center'>
                      <span className='rangeVal'>50%</span>
                    </div>
                    <div className='col-4 a-right'>
                      <span className='rangeVal'>100%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-12 col-md-6 offset-md-3'>
                  <Button
                    color='base'
                    className='btn prop-btn w100'
                    onClick={() => {
                      handleSetStake(
                        (parseInt(value) * parseFloat(userBalance)) / 100
                      )
                    }}
                  >
                    {isProcessing ? (
                      <Spinner
                        name='three-bounce'
                        color='white'
                        fadeIn='none'
                      />
                    ) : (
                      <span>Set Stake</span>
                    )}
                  </Button>
                </div>
              </div>
            </from>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

export default StakeModalContainer
