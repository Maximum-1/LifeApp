import React, {Component} from 'react';
import { connect } from 'react-redux';


//import components to be used on this page
import Item from '../../Item/Item';
import AppIntroModal from '../../Modal/AppIntroModal';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';



class UserPage extends Component {
  state = {
    modalShow: false, 
  }

  componentDidMount() {
      this.props.dispatch({ type: 'GET_TREE'  });
      console.log('first_time is', this.props.user.first_time === true);
      if(this.props.user.first_time === true) {
        this.setState({modalShow: true});
      }
  }

  
  setModalShow = (bool) => {
    this.setState({modalShow: bool});
  }

  render() {
    return (
      <>
      <Card className="bg-dark text-center banner-image">
        <Card.Img src="./images/tree_roots.jpg" alt="Card image" />
        <Card.ImgOverlay>
          
          <Card.Title>
          <Image src="./images/Maximum_1_Logo_Yellow.png" thumbnail/>
            <h1 id="welcome" className="banner-image">
              Welcome, { this.props.user.username }!
            </h1>
          </Card.Title>
            <pre className="banner-image">
            "I don't care if you fall 100 times, which I have; if you'll keep getting up, 
            refuse to quit, seek wise counsel and fight to apply what you learn, you'll see 
            positive change in your life. That's persistence."
            </pre>
        </Card.ImgOverlay>
      </Card>
      <div>
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
      </>
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





