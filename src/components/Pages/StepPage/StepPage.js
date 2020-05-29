import React, { Component } from 'react'
import { connect } from 'react-redux';
import './StepPage.css';
//Import Bootstrap features
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


class StepPage extends Component {

  componentDidMount() {
    this.getSingleStep();
  }

  getSingleStep = () => {
    console.log('this.props is', this.props);
    //Getting query string to obtain the step ID
    let queryString = this.props.location.search;
    //Remove unneccessary portion of URL path
    let step_id = queryString.replace('?tree_step_id=', '');
    console.log('The step id is', step_id);
    //Now we can dispatch to the Saga
    this.props.dispatch({ type: 'GET_SINGLE_STEP', payload: step_id });
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
                placeholder={this.props.step.content} />
            </InputGroup>
          </Card.Body>
        </Card>
        {this.props.step.step_name == 'Trigger' ?
        <button className="card-btn">View Phases</button>
        : <button className="card-btn">Previous Step</button>}
        {this.props.step.step_name == 'Status' ?
        <button className="card-btn">Finish Tree</button>
        : <button className="card-btn">Next Step</button>}
      </>
    )
  }
}



const mapStateToProps = reduxState => ({
  step: reduxState.singleStepReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StepPage);
