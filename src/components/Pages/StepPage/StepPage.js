import React, { Component } from 'react'
import { connect } from 'react-redux';
import './StepPage.css';
//Import Bootstrap features
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


class StepPage extends Component {
  state = {
    tree_id: '',
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
    const filterStep = this.props.steps.filter(obj => obj.step_number === step_number);

    //Setting state for step using step number from url query string
    this.setState({ step_number: step_number });
    //Assign object to state from filter
    this.setState({ step_info: filterStep[0] });
    this.setState({ answer: filterStep[0].content });
    this.setState({ tree_id: tree_id });

    //Dispatch to Saga
    this.props.dispatch({ type: 'FETCH_TREE_BY_ID', payload: tree_id });
  }

  //Handles change to text box
  handleAnswerChange = (event) => {
    console.log('in handleChange', event.target.value);
    this.setState({
      answer: event.target.value
    });
  }

  //Buttons to create "Next Step, Previous Step"
  handlePreviousStep = () => {
    const filterStep = this.props.steps.filter(obj => Number(obj.step_number) === Number(this.state.step_number) - 1);
    this.setState({ step_info: filterStep[0] });
    this.setState({ step_number: this.state.step_number - 1 });
    this.setState({ answer: filterStep[0].content });
    this.topFunction();
  }

  handleNextStep = (tree_step_id) => {
    if (this.state.answer === null) {
      alert('Please enter some self-reflection. You can always come back and edit later.')
    } else {
      const filterStep = this.props.steps.filter(obj => Number(obj.step_number) === Number(this.state.step_number) + 1);
      this.setState({ step_info: filterStep[0] });
      this.setState({ step_number: this.state.step_number + 1 });
      this.setState({ answer: filterStep[0].content });
      //Update changes to the database for the answer
      this.props.dispatch({ type: 'PUT_ANSWER', payload: { answer: this.state.answer, tree_id: this.state.tree_id, tree_step_id: tree_step_id } });
      this.topFunction();
    }
  }

  goToPhasePage = (tree_id) => {
    console.log('id is',tree_id);
    this.props.history.push(`/phases?tree-id=${tree_id}`);
  }

  handleGoHome = (tree_step_id) => {
    if (this.state.answer === null) {
      alert('Please enter some self-reflection. You can always come back and edit later.')
    } else {
      //Update changes to the database for the answer
      console.log('answer, tree_id, tree_step_id is', this.state.answer, this.state.tree_id, tree_step_id);
      this.props.dispatch({ type: 'PUT_ANSWER', payload: { answer: this.state.answer, tree_id: this.state.tree_id, tree_step_id: tree_step_id } });
      alert('Congratulations on completing your tree! Please choose where you want to go next.')
      this.props.history.push(`/`);
    }
  }

  //Method used to scroll to the top after they click the next or previous buttons
  topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  buttonRender = (step_number) => {
    if(step_number === 1) {
      return(
      <>
        <button className="card-btn" onClick={(event) => this.goToPhasePage(this.state.tree_id)}>Return to Phases</button>
        <button className="card-btn" onClick={(event) => this.handleNextStep(this.state.step_info.tree_step_id)}>Next Step</button>
      </>);
    } else if(step_number === 21) {
      return(
      <>
        <button className="card-btn" onClick={(event) => this.handlePreviousStep(event)}>Previous Step</button>
        <button className="card-btn" onClick={(event) => this.handleGoHome(this.state.step_info.tree_step_id)}>Finish</button>
      </>);
    } else {
      return(
      <>
        <button className="card-btn" onClick={(event) => this.handlePreviousStep(event)}>Previous Step</button>
        <button className="card-btn" onClick={(event) => this.handleNextStep(this.state.step_info.tree_step_id)}>Next Step</button>
      </>);
    }
  }

  render() {
    const step_info = this.state.step_info;
    if (this.props.steps.length) {
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
                  value={this.state.answer || ''}
                  onChange={(event) => this.handleAnswerChange(event)}
                />
              </InputGroup>
            </Card.Body>
          </Card>
          <div className="card-body">
            {this.buttonRender(this.state.step_number)}
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
