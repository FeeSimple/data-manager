import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import UserSend from '../UserSend'

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
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      user,
      userSendErr,
      isProcessing,
      handleUserSend
    } = this.props
    
    return (
      <>
        <Button color='base-o' className='btn prop-btn m-l-5' onClick={this.toggle}>Send</Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <div className='fs-16 clr-base tc'>Send XFS</div>
          </ModalHeader>
          <ModalBody>
            <div className='tc m-b-30'>Send XFS to another FeeSimple account</div>
            <UserSend
              user={user}
              handleUserSend={handleUserSend}
              userSendErr={userSendErr}
              isProcessing={isProcessing}
              toggle={this.toggle}
            />
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default SendModalContainer;