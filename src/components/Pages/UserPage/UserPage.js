import React, {Component} from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

//import components to be used on this page
import Item from '../../Item/Item';
import AppIntroModal from '../../Modal/AppIntroModal';
class UserPage extends Component {
  state = {
    modalShow: false,
  }

  componentDidMount() {
      this.props.dispatch({ type: 'GET_TREE'  });
      if(this.props.user.first_time === true) {
        this.setState({modalShow: true});
      }
  }

  setModalShow = (bool) => {
    this.setState({modalShow: bool});
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>

        <div className="input-form">
          <InputGroup >
            <Input size="lg" placeholder="search a keyword" value={this.state.search} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={this.handleSubmit}>Search!!</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>


        <AppIntroModal
          user_id={this.props.user.id}
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        />
        <div className='flex-container'>
          {this.props.trees.map((tree) => {
            return(
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
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => ({
  user: reduxState.user,
  trees: reduxState.allTreesReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);





