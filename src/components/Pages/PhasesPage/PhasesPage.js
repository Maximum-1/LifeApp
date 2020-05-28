import React, { Component } from 'react'
import { connect } from 'react-redux';

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

  render() {
    return (
      <div>
        <h1>Phases Page</h1>
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  
});

export default connect(mapStateToProps)(PhasesPage);