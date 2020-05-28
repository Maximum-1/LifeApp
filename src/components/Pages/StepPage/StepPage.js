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
    let step_id = queryString.replace('?tree_step_id=', '');
    console.log('The step id is', step_id);
    //Now we can dispatch to the Saga
    this.props.dispatch({ type: 'GET_SINGLE_STEP', payload: step_id });
  }


  render() {
    return (
      <div>
        <h1>{this.props.step.phase_name}</h1>
      </div>
    )
  }
}



const mapStateToProps = reduxState => ({
  step: reduxState.singleStepReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StepPage);
