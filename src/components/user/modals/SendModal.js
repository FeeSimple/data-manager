import React, { Component } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap';

class SendModalContainer extends React.Component {
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
        <Button color='base-o' className='btn prop-btn m-l-5' onClick={this.toggle}>Send</Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            <h3 className='fs-16 clr-base tc'>Send XFS</h3>
            <p className='tc m-b-30'>Send XFS to another FeeSimple account</p>

            <from>
              <div className='form-group'>
                <div className='col-12'>
                  <div className='form-group m-b-0'>
                    <label className=""> To Account </label>
                    <input name="name" type="text" className="form-control" value=""/>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-12'>
                  <div className='form-group m-b-0'>
                    <label className=""> XFS Amount </label>
                    <a className='fr' href='#'>Send Max</a>
                    <input type="text" className="form-control" value=""/>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-12'>
                  <div className='form-group'>
                    <label className=""> Message (Optional)</label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div className='form-group row m-l-0 m-r-0 m-b-15'>
                <div className='col-6'>
                  <Button color='gray-o' className='btn prop-btn w100' onClick={this.toggle}>Cancel</Button>
                </div>
                <div className='col-6'>
                  <Button color='base' className='btn prop-btn w100' onClick={this.toggle}>Send</Button>
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