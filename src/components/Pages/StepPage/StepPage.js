import React, { Component } from 'react'
import { connect } from 'react-redux';
import './StepPage.css';
//Import Bootstrap features
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


class StepPage extends Component {
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
      </>
    )
  }
}



const mapStateToProps = reduxState => ({
  step: reduxState.singleStepReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StepPage);
