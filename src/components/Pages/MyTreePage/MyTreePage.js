import React, {Component} from 'react'
// import { InputGroup, InputGroupAddon, Button, Input, FormGroup, Label } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';


import { connect } from 'react-redux';

//import components to be used on this page
import Item from '../../Item/Item';

//import css file for UserPage.js
import './MyTreePage.css';

class MyTreePage extends Component {

  state = {
    search: "",
    sortStatus: ""
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_TREE' });
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      search: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('this.state.search is:', this.state.search);
    this.props.dispatch({ type: "SEARCH_TREE", payload: this.state.search });
  };

  handleSort = (event) => {
    this.setState({
      sortStatus: event.target.value,
    })
    console.log('Tree sortStatus is:', this.state.sortStatus);
    this.props.dispatch({ type: 'SORT_TREE', payload: event.target.value });
  }


  render() {
    return (
    <div>
      <h1>My Trees Page</h1>

        <div class="form">
          <div class="input-form">
            <Form.Label>Search or Sort Trees</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search A Tree"
                aria-label="Search A Tree"
                aria-describedby="basic-addon2"
                value={this.state.search} 
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button variant="primary" onClick={this.handleSubmit}>Find</Button>
              </InputGroup.Append>
            </InputGroup>

            <Form.Group controlId="Form.ControlSelect1">
              <Form.Control as="select" onChange={(event) => this.handleSort(event)}>
                <option value="1">All Trees</option>
                <option value="2">Completed Trees</option>
                <option value="3">In Progress Trees</option>
                <option value="4">No Started Trees</option>
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

const mapStateToProps = reduxState => ({
  user: reduxState.user,
  trees: reduxState.allTreesReducer
});

export default connect(mapStateToProps)(MyTreePage);
