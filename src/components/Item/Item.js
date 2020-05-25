import React, {Component} from 'react';
import { connect } from 'react-redux';

//import components to be used on this component
import Card from 'react-bootstrap/Card';

class Item extends Component {
  render() {
    return (
        <Card>
            <Card.Img variant="top" src="./images/tree.jpg" />
            <Card.Body>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    );
  }
}

const mapStateToProps = state => ({
  
});

// this allows us to use <App /> in index.js
export default connect()(Item);