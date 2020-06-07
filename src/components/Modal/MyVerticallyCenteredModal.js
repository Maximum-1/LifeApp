import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import components to be used on this component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

class MyVerticallyCenteredModal extends Component {
  state = {
    treeName: ''
  }

  //Keeps track of the changes to the input field
  handleChangeFor = (event) => {
    this.setState({
      treeName: event.target.value
    });
  }

  //What to do when the submit button is clicked
  handleSubmit = () => {
    //Sends a dispatch to update the speech_eval that were added.
    this.props.dispatch({ type: 'ADD_TREE', payload: { user_id: this.props.user_id, treeName: this.state.treeName } });

    //Close modal after user clicks on create tree
    this.props.onHide();
    Swal.fire({
      position: 'middle-end',
      icon: 'success',
      title: `Success! You have added ${this.state.treeName}`,
      showConfirmButton: false,
      timer: 3000  //3seconds
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Tree
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tree Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Tree Name"
                onChange={(event) => this.handleChangeFor(event)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Add Tree
          </Button>
          <Button onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(MyVerticallyCenteredModal);