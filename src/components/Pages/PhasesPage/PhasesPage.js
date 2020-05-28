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
          <h5>{this.props.steps[0].date_created}</h5>
          {this.phasesRendering()}
        </div>
      );
    }
  }

  phasesRendering = () => {
    //Flag to check if its the same phase
    let phase_name = '';
    //Dropdowns to return
    let phaseDropDowns = [];

    if(this.props.steps.length) {
      {phaseDropDowns = this.props.steps.map(step => {
        if(phase_name !== step.phase_name) {
          phase_name = step.phase_name;
          return(
              <Dropdown key={step.phase_name}>
                <Dropdown.Toggle id="dropdown-basic" block>
                  {step.phase_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.stepsRendering(step.phase_name)}
                </Dropdown.Menu>
              </Dropdown>
            );
          }
        });
      }//end of map
    }//end of top if
    return phaseDropDowns; 
  }

  stepsRendering = (phase) => {
    console.log('phase is',phase);
    let step_links = '';
    if(this.props.steps.length){
      {step_links = this.props.steps.map(step => {
        if(phase === step.phase_name) {
          return(
            <Dropdown.Item block><span className='steps-text'>{step.step_name}</span></Dropdown.Item>
          );
        }
      })}
    }
    return step_links;
  }

  render() {
    return (
      <div>
        <h1>Phases</h1>
        <hr />
        {this.dropdownRendering()}
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  steps: reduxStore.stepReducer
});

export default connect(mapStateToProps)(PhasesPage);