import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import to do routing
import { withRouter } from 'react-router-dom';

//import styles
import './Item.css';

//import components to be used on this component
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Swal from 'sweetalert2'

class Item extends Component {


  //Method for getting the percent of how completed the tree is
  percentageComplete = () => {
    //Need to divide number of steps_completed by 21 to get percentage of tree completed
    let percentage = this.props.steps_completed / 21 * 100;
    //Rounding percentage to the nearest tenth
    percentage = Math.round(percentage * 10) / 10;
    return percentage;
  }

  //Method for deleting a tree
  handleDelete = (id) => {
    console.log('id is', id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log('this.props is',this.props.tree_name);
        this.props.dispatch({ type: 'DELETE_TREE', payload: { tree_id: id, user_id: this.props.user.id } });
        Swal.fire({
          text: `${this.props.tree_name} Deleted!`,
          icon: 'error',

        })
      }
    })

  } 

  goToPhasePage = (tree_id) => {
    console.log('id is', tree_id);
    this.props.history.push(`/phases?tree-id=${tree_id}`);
  }
  goToSummariesPage = (tree_id) => {
    console.log('id is', tree_id);
    this.props.history.push(`/summaries?tree-id=${tree_id}`);
  }

  render() {
    return (
      <Card style={{ width: '22rem' }}>
        <Card.Header>
          <h2>{this.props.tree_name}</h2>
          <h5>Date Created: {this.props.date_created.substring(0, 10)}</h5>
          <ProgressBar now={this.percentageComplete()} label={`${this.percentageComplete()}%`} />
        </Card.Header>
        <Card.Body>
          <div>
            <button
              className="card-btn"
              onClick={() => this.goToPhasePage(this.props.tree_id)}
            >View Tree</button>
            <button className="card-btn"
              onClick={() => this.goToSummariesPage(this.props.tree_id)}
            >View Summary</button>
            <button
              className="card-btn"
              onClick={() => this.handleDelete(this.props.tree_id)}
            >
              <span>Delete <i className="fa fa-trash fa-fw" aria-hidden="true"></i></span>
            </button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}


const mapStateToProps = reduxState => ({
  user: reduxState.user

});

// this allows us to use <App /> in index.js
export default withRouter(connect(mapStateToProps)(Item));