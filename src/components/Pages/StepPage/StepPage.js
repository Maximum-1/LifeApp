import React, { Component } from 'react'
import { connect } from 'react-redux';


class StepPage extends Component {

  componentDidMount() {
    this.getSingleStep();
  }

  getSingleStep = () => {
    console.log('this.props is', this.props);
    //Getting query string to obtain the step ID
    let queryString = this.props.location.search;
    //Remove unneccessary portion of URL path
    let step_id = queryString.replace('?step-id=', '');
    console.log('The step id is', step_id);
    //Now we can dispatch to the Saga
    this.props.dispatch({ type: 'GET_SINGLE_STEP', payload: step_id });
  }


  render() {
    return (
      <div>
        <>
        <h2>Steps Page</h2>
         <h2 >{this.props.step.phase_name}</h2>
          <h5>{this.props.step.step_number}: {this.this.props.step.step_name}</h5>
          <h5>Description></h5>
          <p>{this.props.step.description}</p>
          <h5>Optional Sentence Starters and Hints</h5>
          <p>{this.props.step.optional_hint}</p>
          <h5>Self-Reflection</h5>
        </>
      </div>
    )
  }
}



const mapStateToProps = reduxState => ({
  step: reduxState.STEP
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StepPage);
