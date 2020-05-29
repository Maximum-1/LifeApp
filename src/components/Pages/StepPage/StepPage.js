import React, { Component } from 'react'
import { connect } from 'react-redux';
import './StepPage.css';
//Import Bootstrap features
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


class StepPage extends Component {

  state = {
    id: 0,
    answer: ''
  }

  componentDidMount() {
    this.getSingleStep();
  }

  //Gets step id from URL path, we use this ID to get specific step info
  getSingleStep = () => {
    console.log('this.props is', this.props);
    //Getting query string to obtain the step ID
    let queryString = this.props.location.search;
    //Remove unneccessary portion of URL path
    let step_id = queryString.replace('?tree_step_id=', '');
    console.log('The step id is', step_id);
    this.setState({
      id: step_id
    });
    //Now we can dispatch to the Saga
    this.props.dispatch({ type: 'GET_SINGLE_STEP', payload: step_id });
  }
//Handles change to text box
  handleAnswerChange = (event) => {
    console.log('in handleChange', event.target.value);
    this.setState({
      answer: event.target.value
    });
  }
//If the user is on the first step and wants to go back,
//this will send them back to the Phases page
  handleGoToPhases = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.dispatch({ type: 'PUT_ANSWER', payload: this.state })
    this.setState({
      answer: ''
    });
    this.props.history.push('/phases')
  }
//If the user has completed their response and is ready to move on,
//this sends them to the next step
  handleNextStep = (event) => {
    event.preventDefault();
    console.log('in handleNextButton');
    this.props.dispatch({ type: 'PUT_ANSWER', payload: this.state })
    this.setState({
      answer: ''
    });
    let queryString = this.props.location.search;
    let tree_step_id = queryString.replace('?tree_step_id=', '');
    let tree_step = tree_step_id++
    this.props.history.push(`/step?tree_step_id=${tree_step}`);
  }

  handlePreviousStep = (event) => {
    event.preventDefault();
    console.log('in handleNextButton');
    this.props.dispatch({ type: 'PUT_ANSWER', payload: this.state })
    this.setState({
      answer: ''
    });
    let queryString = this.props.location.search;
    let tree_step_id = queryString.replace('?tree_step_id=', '');
    this.props.history.push(`/step?tree_step_id=${tree_step_id--}`);
  }

  handleGoHome = (event) => {
    event.preventDefault();
    console.log('in handleNextButton');
    this.props.dispatch({ type: 'PUT_ANSWER', payload: this.state })
    this.setState({
      answer: ''
    });
    this.props.history.push('/')
  }


  render() {
    return (
      <>
        <div className="phase-step-names">
          <h1>{this.props.step.phase_name}</h1>
          <hr />
          <h3>{this.props.step.step_name}</h3>
        </div>
        <Card className="text-center">
          <Card.Header className="header">Description</Card.Header>
          <Card.Body>
            <Card.Text>
              {this.props.step.description}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Header className="header">Optional Sentence Starters and Hints</Card.Header>
          <Card.Body>
            <Card.Text>
              {this.props.step.optional_hint}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Header className="header">Self-Reflection</Card.Header>
          <Card.Body>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                placeholder={this.props.step.content}
                onChange={(event) => this.handleAnswerChange(event)}
                onSubmit={(event) => this.handleSubmit(event)} />
            </InputGroup>
          </Card.Body>
        </Card>
        {this.props.step.step_name === 'Trigger' ?
          <button className="card-btn" onClick={(event) => this.handleGoToPhases(event)}>View Phases</button>
          : <button className="card-btn" onClick={(event) => this.handlePreviousStep(event)}>Previous Step</button>}
        {this.props.step.step_name === 'Status' ?
          <button className="card-btn" onClick={(event) => this.handleGoHome(event)}>Finish Tree</button>
          : <button className="card-btn" onClick={(event) => this.handleNextStep(event)}>Next Step</button>}
      </>
    )
  }
}



const mapStateToProps = reduxState => ({
  step: reduxState.singleStepReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StepPage);
