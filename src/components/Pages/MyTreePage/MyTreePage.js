import React, {Component} from 'react'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import { connect } from 'react-redux';

//import components to be used on this page
import Item from '../../Item/Item';

//import css file for UserPage.js
import './MyTreePage.css';

class MyTreePage extends Component {

  state = {
    search: "",
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


  render() {
    return (
    <div>
      <h1>My Trees Page</h1>

        <div className="input-form">
          <InputGroup >
            <Input size="sm" placeholder="search a tree" value={this.state.search} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">
              <Button size="sm" color="primary" onClick={this.handleSubmit}>Find</Button>
            </InputGroupAddon>
          </InputGroup>
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
