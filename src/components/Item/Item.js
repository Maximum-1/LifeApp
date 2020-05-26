import React, {Component} from 'react';
import { connect } from 'react-redux';

//import styles
import './Item.css';

//import components to be used on this component
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Item extends Component {
  render() {
    return (
      <Card style={{ width: '22rem' }}>
          <Card.Img variant="top" src="./images/tree.jpg" />
          <Card.Header>
            <h2>Tree Title</h2>
            <h5>Date Created: 01/01/2020</h5>
            <ProgressBar now={40} />
          </Card.Header>
          <Card.Body>
              <Card.Text>
              Some quick example text to build on the card title and make up the bulk
              of the card's content.
              </Card.Text>
              <div>
                <button className="card-btn">View Tree</button>
                <button className="card-btn">View Summary</button>
                <button className="card-btn"><span>Delete <i className="fa fa-trash fa-fw" aria-hidden="true"></i></span></button>
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