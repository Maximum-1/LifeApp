import React, { Component } from 'react'
import { connect } from 'react-redux';
import './StepPage.css';
//Import Bootstrap features
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


class StepPage extends Component {
  state = {
    step_number: 1,
    answer: ''
  }

  componentDidMount() {
    this.getTreeById();
  }

  //Get the speech from the database and set to redux state
  getTreeById = () => {
    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tree_id = urlParams.get('tree-id');
    const step_number = urlParams.get('step_number');
    this.setState({step_number: step_number - 1});

    //Dispatch to Saga
    this.props.dispatch({ type: 'FETCH_TREE_BY_ID', payload: tree_id});
  }

  //Handles change to text box
  handleAnswerChange = (event) => {
    console.log('in handleChange', event.target.value);
    this.setState({
      answer: event.target.value
    });
  }

  saveAnswer = () => {
    this.props.dispatch({ type: 'PUT_ANSWER', payload: {answer: this.state.answer}});
  }

  //Buttons to create "Next Step, Previous Step"
  handlePreviousStep = () => {
    this.setState({step_number: this.state.step_number - 1});
    this.topFunction();
  }

  handleNextStep = () => {
    this.setState({step_number: this.state.step_number + 1});
    this.topFunction();
  }

  //Method used to scroll to the top after they click the next or previous buttons
  topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    console.log('state step_number is', this.state.step_number);
    if(this.props.steps.length) {
      return (
        <>
          <div className="phase-step-names">
            <h1>{this.props.steps[this.state.step_number].phase_name}</h1>
            <hr />
            <h3>{this.props.steps[this.state.step_number].step_name}</h3>
          </div>
          <Card className="text-left">
            <Card.Header className="header">Description</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[this.state.step_number].description}</pre>
            </Card.Body>
          </Card>
          <Card className="text-left">
            <Card.Header className="header">Optional Sentence Starters and Hints</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[this.state.step_number].optional_hint}</pre>
            </Card.Body>
          </Card>
          <Card className="text-left">
            <Card.Header className="header">Self-Reflection</Card.Header>
            <Card.Body>
              <InputGroup>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  placeholder={this.props.steps[this.state.step_number].content || ''}
                  onChange={(event) => this.handleAnswerChange(event)}
                />
              </InputGroup>
            </Card.Body>
          </Card>
          <div className="card-body">
            <button className="card-btn" onClick={(event) => this.handlePreviousStep(event)}>Previous Step</button>
            <button className="card-btn" onClick={(event) => this.handleNextStep(event)}>Next Step</button>
          </div>
        </>
      )
    }
  }
}



const mapStateToProps = reduxStore => ({
  steps: reduxStore.stepReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StepPage);
