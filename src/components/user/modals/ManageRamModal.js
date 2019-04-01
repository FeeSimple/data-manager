import React, { Component } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap';

class ManageRamModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <>
        <p><span href="" onClick={this.toggle}>MANAGE RAM</span></p>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            <h3 className='fs-16 clr-base tc'>Buy or Sell RAM</h3>
            <p className='tc m-b-30'>Buy additional RAM or sell what you have:</p>

            <from>
              <div className='form-group'>
                <div className='col-12'>
                  <div className='form-group'>
                    <label className=""> XFS Amount</label>
                    <div className='fr'>
                      <a className='fl' href='#'>Sell Max</a>
                      <a className='fl m-l-10' href='#'>Buy Max</a>
                    </div>
                    <input type="text" className="form-control" value=""/>
                  </div>
                </div>
                <div className='col-12'>
                  <h4 className='modal-h4 m-b-5'>In Bytes</h4>
                  <h2 className='modal-h2 m-b-5'>100,670 bytes</h2>
                  <h4 className='modal-h4 m-b-0'>1 kB = 0.02 XFS</h4>
                </div>
              </div>
              <div className='form-group row m-l-0 m-r-0'>
                <div className='col-6'>
                  <Button color='base' className='btn prop-btn w100' onClick={this.toggle}>Sell</Button>
                </div>
                <div className='col-6'>
                  <Button color='base' className='btn prop-btn w100' onClick={this.toggle}>Buy</Button>
                </div>
              </div>
            </from>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default ManageRamModalContainer;