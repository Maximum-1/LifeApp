import React, { Component } from 'react'
import { connect } from 'react-redux';

//import components to be used on this page
import Dropdown from 'react-bootstrap/Dropdown';

//import styles
import './PhasesPage.css'

class PhasesPage extends Component {
  componentDidMount() {
    this.getTreeById();
  }

  //Get the speech from the database and set to redux state
  getTreeById = () => {
    console.log('this.props is', this.props);
    //Looking for query string to get id of movie
    let querystring = this.props.location.search;

    //Removing extra part of the path
    let tree_id = querystring.replace('?tree-id=', '');
    console.log('tree_id is', tree_id);
    //Dispatch to Saga
    this.props.dispatch({ type: 'FETCH_TREE_BY_ID', payload: tree_id});
  }

  dropdownRendering = () => {
    //Make sure to use if so that items are loaded before trying to access using the dot notation
    //!!!!!!
    if(this.props.steps.length) {
      return(
        <div>
          <h2>{this.props.steps[0].tree_name}</h2>
          <h5>{this.props.steps[0].date_created.substring(0, 10)}</h5>
          {this.phasesRendering()}
        </div>
      );
    }
  }

  phasesRendering = () => {
    //Flag to check if its the same phase
    let phase_name = '';
    //Dropdowns to return
    const phaseDropDowns = this.props.steps.map(step => {
        if(phase_name !== step.phase_name) {
          phase_name = step.phase_name;
          return(
              <Dropdown key={step.phase_name}>
                <Dropdown.Toggle id="dropdown-basic" block="true">
                  {step.phase_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.stepsRendering(step.phase_name)}
                </Dropdown.Menu>
              </Dropdown>
            );
          }
        });
 
    return phaseDropDowns; 
  }

  stepsRendering = (phase) => {
      const step_links = this.props.steps.map(step => {
        if(phase === step.phase_name && step.locked === true) {
          return(
            <Dropdown.Item
              key={step.step_name}
              block="true" 
            >
              <span className='steps-text'>{step.step_name}</span>
              <span className='lock-icon'><i className="fa fa-lock" aria-hidden="true"></i></span>
            </Dropdown.Item>
          );
        //end of inner if
        } else if(phase === step.phase_name && step.locked === false){
          return(
            <Dropdown.Item
              key={step.step_name}
              block="true"
              onClick={() => this.goToStepPage(step.tree_step_id)}
            >
              <span className='steps-text'>{step.step_name}</span>
            </Dropdown.Item>
          );
        }
      })
    //Need to use reverse to get the steps in the proper order  
    return step_links;
  }

  goToStepPage = (id) => {
    console.log('id is',id);
    this.props.history.push(`/step?tree_step_id=${id}`);
  }

  progressCompleted = () => {
    const completedSteps = this.props.steps.filter(step => step.status === true);
    console.log()
  }

  render() {
    return (
      <div className='phases-page'>
        <h1>Phases</h1>
        <hr />
        {this.dropdownRendering()}
        <a href="http://localhost:3000/#/step?tree_step_id=1">test</a>
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  steps: reduxStore.stepReducer
});

export default connect(mapStateToProps)(PhasesPage);