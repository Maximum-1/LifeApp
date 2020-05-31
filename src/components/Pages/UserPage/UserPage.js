import React, {Component} from 'react';
import { connect } from 'react-redux';

//import components to be used on this page
import Item from '../../Item/Item';
import Card from 'react-bootstrap/Card';

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
        <div>
        <Card className="bg-dark text-white hero-image">
          <Card.Img src="./images/tree.jpg" alt="Card image"/>
          <Card.ImgOverlay>
            <Card.Title>HBX: The Human Behavior Matrix</Card.Title>
            <div className="hero-text">
            <pre>
            “When I was in my 20s, I got understanding of human behavior. I used a “tree” to describe the basic
            connection between trauma events (roots), resulting core beliefs (trunk), thoughts and attitudes
            (branches), and finally behavior (fruit).
            I didn’t yet know there was much more detail, but it was a starting framework. From these ideas, I
            started my personal journey to wholeness and THE HB-X™ emotional health protocol featured in the
            Maximum 1™ Life App. It saved me from discouragement, being consumed by hate and rage, suicide,
            and addiction, bad habits, and also depression.”
            –Marius J. Massie, Creator, THE HB-X™
            Much of the way we move in the world is built on emotional learning that was formed when we were
            quite young. Some emotional learning produces healthy fruit (self-esteem, connectedness, healthy
            boundaries, etc.) and some produce unhealthy fruit (low self-worth, ambivalence, unsafe behaviors).
            Most often, this emotional learning either helps us thrive or survive in our families of origin depending
            on what the atmosphere was like. As we mature, those ways of being follow us and can either continue
            to help us thrive or continue to keep us in survival mode (fight, flight, freeze, or submit) even when we
            no longer need to be.
            The good news is that this can change with some intention and willingness to do some deeper work. THE
            HB-X™ is just the instrument to help. This step-by-step protocol will help you work your way to the root
            of the problem and then change it with new evidence that is based on truth.
            </pre>
            </div>
          </Card.ImgOverlay>
        </Card>
        </div>
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





