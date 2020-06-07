import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import components to be used on this component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

class RatingModal extends Component {
  state = {
    surveyAnswers: {
      recurrence: '',
      dayWeekMonth: '',
      duration: '',
      intensity: '',
    }
  }

  //Keeps track of the changes to the input field
  handleChangeFor = (event, propertyName) => {
    this.setState({
      surveyAnswers: {
        ...this.state.surveyAnswers,
        [propertyName]: event.target.value,
      }
    });
  }

  //What to do when the submit button is clicked
  handleSubmit = () => {
    //Sends a dispatch to update the speech_eval that were added.
    this.props.dispatch({ type: 'FIRST_RATING', payload: { firstRating: this.state.surveyAnswers, tree_id: this.props.tree_id } });

    //Close modal after user clicks on create tree
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        tree_id={this.props.tree_id}
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Would you like to take a brief survey reguarding your Tree? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>1) Recurrence</Form.Label>
              <h5>How often do you experience the problem? Clue: Certain problems happen many times in a day
                while others are best quantified over a longer period of time, like a week or month.</h5>
              <Form.Control
                type="number"
                value={this.state.surveyAnswers.recurrence}
                placeholder="Times Per"
                onChange={(event) => this.handleChangeFor(event, 'recurrence')} />
              <h5>Times per</h5>
              <select
                onChange={(event) => this.handleChangeFor(event, 'dayWeekMonth')}>
                <option value='' >Select</option>
                <option value='day'>Day</option>
                <option value='week'>Week</option>
                <option value='month'>Month</option>
              </select>
              <br></br>
              <br></br>
              <br></br>
              <Form.Label> 2) Duration</Form.Label>
              <h5>From the time you are prompted into the problem, how many days does it last/persist?
              Clue: This includes the after-effects/consequences of the problem such as: an emotional hangover after a panic attack, shame after addictive behaviors, or relational disruptions after an emotional outburst.
</h5>
              <Form.Control
                type="number"
                value={this.state.surveyAnswers.duration}
                placeholder="Number of Days"
                onChange={(event) => this.handleChangeFor(event, 'duration')} />
              <br></br>
              <br></br>
              <br></br>
              <Form.Label> 3) Intensity</Form.Label>
              <h5>How disturbing or upsetting does the problem feel at its worst? Clue: Rate between zero
                 and ten with zero being neutral or no disturbance and ten being the worst disturbance imaginable.</h5>
              <select
                onChange={(event) => this.handleChangeFor(event, 'intensity')}>
                <option value='' >Select</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4' >4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8' >8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit Survey
          </Button>
          <Button onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect()(RatingModal);