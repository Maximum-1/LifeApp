import React, {Component} from 'react';
import { connect } from 'react-redux';

//import styles
import './Item.css';

//import components to be used on this component
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Item extends Component {

  percentageComplete = () => {
    //Need to divide number of steps_completed by 21 to get percentage of tree completed
    let percentage = this.props.steps_completed/21* 100;
    //Rounding percentage to the nearest tenth
    percentage = Math.round(percentage * 10) / 10;
    return percentage;
  }

  handleDelete = (id) => {
    console.log('id is', id);
    this.props.dispatch({ type: 'DELETE_TREE', payload: {tree_id: id }});
  }

  render() {
    return (
      <Card style={{ width: '22rem' }}>
          <Card.Img variant="top" src="./images/tree.jpg" />
          <Card.Header>
            <h2>{this.props.tree_name}</h2>
            <h5>Date Created: {this.props.date_created.replace('T05:00:00.000Z', '')}</h5>
            <ProgressBar now={this.percentageComplete()} label={`${this.percentageComplete()}%`}/>
          </Card.Header>
          <Card.Body>
              <div>
                <button className="card-btn">View Tree</button>
                <button className="card-btn">View Summary</button>
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

const mapStateToProps = state => ({
  
});

// this allows us to use <App /> in index.js
export default connect()(Item);