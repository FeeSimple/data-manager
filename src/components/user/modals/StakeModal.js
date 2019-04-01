import React, { Component } from 'react'
import { Button, Modal, ModalBody} from 'reactstrap';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class SendModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: 65
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChangeStart = () => {
    //console.log('Change event started')
  };
  handleChange = value => {
    this.setState({
      value: value
    })
  };
  handleChangeComplete = () => {
    //console.log('Change event completed')
  };

  render() {
    const { value } = this.state
    return (
      <>
        <Button color='gray' className='btn prop-btn fr' onClick={this.toggle}>Stake</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            <h3 className='fs-16 clr-base tc'>Manage Stake</h3>
            <p className='tc m-b-30'>To gain additional resources, adjust the amount of <br/> XFS you would like to stake:</p>

            <h2 className='stackvalueRange'>{value}%</h2>
            <h4 className='stackvalue'>10,000.123 XFS</h4>

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
                    <div className='col-4'><span className='rangeVal'>0%</span></div>
                    <div className='col-4 a-center'><span className='rangeVal'>50%</span></div>
                    <div className='col-4 a-right'><span className='rangeVal'>100%</span></div>
                  </div>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-12 col-md-6 offset-md-3'>
                  <Button color='base' className='btn prop-btn w100' onClick={this.toggle}>Set Stake</Button>
                </div>
              </div>
            </from>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default SendModalContainer;