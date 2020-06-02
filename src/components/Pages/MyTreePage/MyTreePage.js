import React, {Component} from 'react'
import { InputGroup, InputGroupAddon, Button, Input, FormGroup, Label } from 'reactstrap';


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
    console.log('Tree category is:', event.target.value);
    this.setState({
      sortStatus: event.target.value,
    })
    this.props.dispatch({ type: 'SORT_TREE', payload: { sortStatus: this.state.sortStatus } });
  }


  render() {
    return (
    <div>
      <h1>My Trees Page</h1>

        <div class="form">
          <div class="input-form">
            <Label for="exampleSelect">Search or Sort Trees</Label>
          <InputGroup >
            <Input placeholder="search a tree" value={this.state.search} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.handleSubmit}>Find</Button>
            </InputGroupAddon>
          </InputGroup>
          <br/>
            <FormGroup>
              
              <Input type="select" name="select" id="treeCategory" onChange={(event) => this.handleSort(event)}>
                <option>All Trees</option>
                <option>Completed Trees</option>
                <option>In Progress Trees</option>
                <option>No Started Trees</option>
              </Input>
            </FormGroup>
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
