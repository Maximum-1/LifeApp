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
    step_info: '',
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
    const step_number = Number(urlParams.get('step_number'));
    const filterStep = this.props.steps.filter(obj => obj.step_number == step_number);
    console.log('this.props.steps',this.props.steps);
    console.log('filterStep is',filterStep);
    this.setState({step_number: step_number});
    this.setState({step_info: filterStep[0]});

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
    console.log('this.props.steps',this.props.steps);
    console.log('step number is', this.state.step_number);
    const filterStep = this.props.steps.filter(obj => Number(obj.step_number) == Number(this.state.step_number) - 1);
    console.log('filterStep is',filterStep);
    this.setState({step_info: filterStep[0]});
    this.setState({step_number: this.state.step_number - 1});
    this.topFunction();
  }

  handleNextStep = () => {
    console.log('this.props.steps',this.props.steps);
    console.log('step number is', this.state.step_number);
    const filterStep = this.props.steps.filter(obj => Number(obj.step_number) == Number(this.state.step_number) + 1);
    console.log('filterStep is',filterStep);
    this.setState({step_info: filterStep[0]});
    this.setState({step_number: this.state.step_number + 1});
    this.topFunction();
  }

  //Method used to scroll to the top after they click the next or previous buttons
  topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    console.log('render step number is',this.state.step_number);
    const step_info = this.state.step_info;
    if(this.props.steps.length) {
      return (
        <>
          <div className="phase-step-names">
            <h1>{step_info.phase_name}</h1>
            <hr />
            <h3>{step_info.step_name}</h3>
          </div>
          <Card className="text-left">
            <Card.Header className="header">Description</Card.Header>
            <Card.Body>
              <pre className="card-text">{step_info.description}</pre>
            </Card.Body>
          </Card>
          <Card className="text-left">
            <Card.Header className="header">Optional Sentence Starters and Hints</Card.Header>
            <Card.Body>
              <pre className="card-text">{step_info.optional_hint}</pre>
            </Card.Body>
          </Card>
          <Card className="text-left">
            <Card.Header className="header">Self-Reflection</Card.Header>
            <Card.Body>
              <InputGroup>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  placeholder={step_info.content || ''}
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
