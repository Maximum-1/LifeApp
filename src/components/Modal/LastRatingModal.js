import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import components to be used on this component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

class LastRatingModal extends Component {
    state = {
        surveyAnswers: {
            recurrence: '',
            dayWeekMonth: '',
            duration: '',
            intensity: '',
            transparency: '',
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
        console.log(this.state.surveyAnswers, 'tree id is,', this.props.tree_id);

        //Sends a dispatch to update the speech_eval that were added.
        this.props.dispatch({ type: 'LAST_RATING', payload: { lastRating: this.state.surveyAnswers, tree_id: this.props.tree_id } });

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
                            <div className="inner-div" onChange={(event) => this.handleChangeFor(event, 'dayWeekMonth')}>
                                <Form.Check
                                    type="radio"
                                    value='day'
                                    label="day"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    type="radio"
                                    value='week'
                                    label="week"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                                <Form.Check
                                    type="radio"
                                    value='month'
                                    label="month"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios3"
                                />
                            </div>
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
                            <Form.Label>
                                3) Intensity
                            </Form.Label>
                            <h5> How disturbing or upsetting does the problem feel at its worst? Clue: Rate between
                                 zero and ten with zero being neutral or no disturbance and ten being the worst disturbance imaginable </h5>
                            <div className="inner-div" onChange={(event) => this.handleChangeFor(event, 'intensity')}>
                                <Form.Check
                                    type="radio"
                                    value='0'
                                    label="0"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    type="radio"
                                    value='1'
                                    label="1"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    type="radio"
                                    value='2'
                                    label="2"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='3'
                                    label="3"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='4'
                                    label="4"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='5'
                                    label="5"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='6'
                                    label="6"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='7'
                                    label="7"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='8'
                                    label="8"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='9'
                                    label="9"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />   <Form.Check
                                    type="radio"
                                    value='10'
                                    label="10"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Form.Label>
                                4) Transparency
                            </Form.Label>
                            <h5> How honest were your responses to the steps in this tree? </h5>
                            <div className="inner-div" onChange={(event) => this.handleChangeFor(event, 'transparency')}>
                                <Form.Check
                                    type="radio"
                                    value='1'
                                    label="Completely (I was blunt)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    type="radio"
                                    value='2'
                                    label="pretty honest (I may have used some nicer or less embarrassing language than was true)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                                <Form.Check
                                    type="radio"
                                    value='3'
                                    label="somewhat honest (It was really hard to say what I truly felt, but I tried)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios3"
                                />
                                <Form.Check
                                    type="radio"
                                    value='4'
                                    label="not honest (I couldn't bring myself to say what I felt)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios4"
                                />
                            </div>
                        </Form.Group>

                    </Form>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit Survey
          </Button>
                    <Button onClick={this.props.onHide}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal >
        );
    }
}

export default connect()(LastRatingModal);