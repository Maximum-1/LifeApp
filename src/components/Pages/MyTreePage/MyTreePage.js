import React, {Component} from 'react'
import { connect } from 'react-redux';

// import component from bootstrap
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import swal from 'sweetalert2';

//import components to be used on this page
import Item from '../../Item/Item';

//import css file for UserPage.js
import './MyTreePage.css';

class MyTreePage extends Component {
  state = {
    search: "",
    sortStatus: ""
  }

  // Retrieve the current Tree list from database once the page loaded
  componentDidMount() {
    this.props.dispatch({ type: 'GET_TREE' });
  }

  // control the input of the search keyword
  handleChange = event => {
    this.setState({
      ...this.state,
      search: event.target.value
    });
  };

  // send the search query to database to match the tree name
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.search === "") {
      return new swal({
        text: "Please enter Tree name",
        icon: "info",
      });
    } else {
      console.log('this.state.search is:', this.state.search);
      this.props.dispatch({ type: "SEARCH_TREE", payload: this.state.search });
    }

  };

  // control and show the completed, in-progress and not started trees
  handleSort = (event) => {
    this.setState({
      sortStatus: event.target.value,
    })
    this.props.dispatch({ type: 'SORT_TREE', payload: event.target.value });
  }

  render() {
    return (

      <div>
        <br /><br />        

        <div class="form">
          <div class="input-form">
            <Form.Label>Search or Sort Trees</Form.Label>
            <InputGroup className="mb-3">
              {/* the input form for search keyword */}
              <FormControl
                placeholder="Search A Tree"
                aria-label="Search A Tree"
                aria-describedby="basic-addon2"
                value={this.state.search}
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button className="search-button" variant="primary" onClick={this.handleSubmit}>Find</Button>
              </InputGroup.Append>
            </InputGroup>
              {/* the input drop down menu to show and sort trees */}
            <Form.Group controlId="Form.ControlSelect1">
              <Form.Control as="select" onChange={(event) => this.handleSort(event)}>
                <option value="1">All Trees</option>
                <option value="2">Completed Trees</option>
                <option value="3">In Progress Trees</option>
                <option value="4">Not Started Trees</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className='flex-container'>
          {this.props.trees.map((tree) => {
            return (
              <Item
                key={tree.id}
                tree_id={tree.id}
                tree_name={tree.name}
                date_created={tree.date_created}
                steps_completed={tree.steps_completed}
              />

            );
          }
          )}
        </div>


      </div>

    )
  }
}

//reducer containing trees and user data
const mapStateToProps = reduxState => ({
  user: reduxState.user,
  trees: reduxState.allTreesReducer
});

export default connect(mapStateToProps)(MyTreePage);
