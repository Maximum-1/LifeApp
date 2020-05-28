import React, {Component} from 'react';
import { connect } from 'react-redux';

//import components to be used on this page
import Item from '../../Item/Item';

class UserPage extends Component {
  componentDidMount() {
      this.props.dispatch({ type: 'GET_TREE'  });
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
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





