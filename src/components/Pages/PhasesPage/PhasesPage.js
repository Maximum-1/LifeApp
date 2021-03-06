import React, { Component } from 'react'
import { connect } from 'react-redux';

//import components to be used on this page
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RatingModal from '../../Modal/RatingModal';

//import styles
import './PhasesPage.css'

class PhasesPage extends Component {
  state = {
    tree_id: '',
    modalShow: false,
  }

  // This method runs for the initial render. 
  //  Obtain tree by idea when the page run
  componentDidMount() {
    this.getTreeById();
  }

  // ComponentDidUpdate invoked immediately after page updating occurr. 
  // This method is not called for the initial render. 
  componentDidUpdate(prevProps) {
    if (this.props.steps.length !== prevProps.steps.length && this.props.steps.length > 0) {
      if (this.props.steps.length) {
        if (this.props.steps[0].status === false) {
          this.setState({ modalShow: true });
        }
      }
    }
  }

  // Method to set modal to show up
  setModalShow = (bool) => {
    this.setState({ modalShow: bool });
  }

  //Get the tree from the database and set to redux state
  getTreeById = () => {
    let querystring = this.props.location.search;
    //Removing extra part of the path
    let tree_id = querystring.replace('?tree-id=', '');
    this.setState({ tree_id: tree_id });
    //Dispatch to Saga
    this.props.dispatch({ type: 'FETCH_TREE_BY_ID', payload: tree_id });
  }

  dropdownRendering = () => {
    //Make sure to use if so that items are loaded before trying to access using the dot notation
    //!!!!!!
    if (this.props.steps.length) {
      return (
        <div>
          <h1>{this.props.steps[0].tree_name}</h1>
          <h5>{this.props.steps[0].date_created.substring(0, 10)}</h5>
          <hr />
          <h2>HB-X Phases</h2>
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
      if (phase_name !== step.phase_name) {
        phase_name = step.phase_name;
        return (
          <Accordion defaultActiveKey="1" key={step.phase_name}>
            <Card>
              <Card.Header className="phase-header">
                <Accordion.Toggle className="phase-header" as={Button} variant="link" eventKey="0" block="true">
                  {step.phase_name} <i className="fa fa-caret-down" aria-hidden="true"></i>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="phase-cards">
                  <ul>
                    {this.stepsRendering(step.phase_name)}
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      }
    });

    return phaseDropDowns;
  }

  // method to render the steps
  stepsRendering = (phase) => {
    const querystring = this.props.location.search;
    //Removing extra part of the path
    const tree_id = querystring.replace('?tree-id=', '');
    const step_links = this.props.steps.map(step => {
      if (phase === step.phase_name && step.locked === true) {
        return (
          <li
            className="step-list"
            key={step.step_name}
          >
            <span className='steps-text'>{step.step_name}</span>
            <span className='lock-icon'><i className="fa fa-lock" aria-hidden="true"></i></span>
          </li>
        );
        //end of inner if
      } else if (phase === step.phase_name && step.locked === false) {
        return (
          <li
            key={step.step_name}
            onClick={() => this.goToStepPage(tree_id, step.step_number)}
          >
            <span className='steps-text'>{step.step_name}</span>
          </li>
        );
      }
    })
    //Need to use reverse to get the steps in the proper order  
    return step_links;
  }

  // method to go to a specific step page
  goToStepPage = (tree_id, step_number) => {
    this.props.history.push(`/step?tree-id=${tree_id}&step_number=${step_number}`);
  }

  // method to filter step completed in database
  // progressCompleted = () => {
  //   const completedSteps = this.props.steps.filter(step => step.status === true);
  // }

  render() {
    return (
      <div className='phases-page'>
        {this.dropdownRendering()}
        <RatingModal
          tree_id={this.state.tree_id}
          user_id={this.props.user.id}
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    )
  }
}

//reducer containing trees and user data
const mapStateToProps = reduxStore => ({
  steps: reduxStore.stepReducer,
  user: reduxStore.user,
});

export default connect(mapStateToProps)(PhasesPage);