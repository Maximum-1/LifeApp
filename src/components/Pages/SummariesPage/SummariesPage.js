import React, { Component } from 'react'
import { connect } from 'react-redux';

//Import components to be used on this component
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class SummariesPage extends Component {
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
    this.props.dispatch({ type: 'FETCH_TREE_BY_ID', payload: tree_id });
  }

  renderSummary = () => {
    if (this.props.steps.length) {
      return (
        <div>
          <Card className="text-left">
            <Card.Header className="header">Trigger</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[0].content}</pre>
            </Card.Body>
          </Card>

          <Card className="text-left">
            <Card.Header className="header">Protect Yourself</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[1].content}</pre>
            </Card.Body>
          </Card>

          <Card className="text-left">
            <Card.Header className="header">Inner Consciousness</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[13].content}</pre>
            </Card.Body>
          </Card>

          <Card className="text-left">
            <Card.Header className="header">Victory Road</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[15].content}</pre>
            </Card.Body>
          </Card>

          <Card className="text-left">
            <Card.Header className="header">W.H.O.L.E. Affirmations™</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[16].content}</pre>
            </Card.Body>
          </Card>

          <Card className="text-left">
            <Card.Header className="header">New Root Belief</Card.Header>
            <Card.Body>
              <pre className="card-text">{this.props.steps[17].content}</pre>
            </Card.Body>
          </Card>

        </div>
      );
    }
  }

  printPage = () => {
    console.log('test');
    window.print();
  }

  render() {
    return (
      <>
        <h1>Summaries Page</h1>
        <hr />
        {this.renderSummary()}
        <Card className="text-left">
          <Card.Body>
            <button className="card-btn"><a href="/">Back</a></button>
            <button className="card-btn" onClick={this.printPage}>Print</button>
          </Card.Body>
        </Card>
      </>
    )
  }
}

const mapStateToProps = reduxStore => ({
  steps: reduxStore.stepReducer
});

export default (connect(mapStateToProps)(SummariesPage));
