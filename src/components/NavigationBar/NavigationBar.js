import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Import components to be used on this component
import LogOutButton from '../LogOutButton/LogOutButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MyVerticallyCenteredModal from '../Modal/MyVerticallyCenteredModal';
import Button from 'react-bootstrap/Button';

//Import Styles
import './NavigationBar.css';

class NavigationBar extends Component {
  state = {
    modalShow: false,
  }

  // to set the showing of the Modal
  setModalShow = (bool) => {
    this.setState({modalShow: bool});
  }

  render() {
    return (
    <Navbar collapseOnSelect expand="lg" className="nav">
      <Navbar.Brand href="/">
        {/* the Maximum1 logo img */}
          <img alt="" src="./images/Maximum_1_Logo_Yellow.png"
            className="d-inline-block align-top"
          />{' '}
          <span className='show hide'>Maximum 1 Life App</span>
      </Navbar.Brand>
      {this.props.user.id ? 
          <>
            <Button className="modal-btn" variant="primary" onClick={() => this.setModalShow(true)}>
              <span><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Tree</span>
            </Button>
            {/* To show the add tree modal */}
            <MyVerticallyCenteredModal
              user_id={this.props.user.id}
              show={this.state.modalShow}
              onHide={() => this.setModalShow(false)}
            />
          </>: null}
      {/* Creates the hamburger menu */}
      <Navbar.Toggle className="custom-toggler" aria-controls="responsive-navbar-nav" />
      {/* A links will be in the dropdown must be children of Collapse */}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {/* Show this link if they are logged in or not,
              but call this link 'Home' if they are logged in,
              and call this link 'Login / Register' if they are not */}
          <Link to="/">{this.props.user.id ? 
            <span><i className="fa fa-fw fa-home"></i>Home</span> : <span><i className="fa fa-sign-in" aria-hidden="true"></i> Login / Register</span>}
          </Link>
          {/* Show the link to the My Trees and the logout button if the user is logged in */}
          {this.props.user.id && (
              <>
                <Link to="/my-tree"><span><i className="fa fa-tree" aria-hidden="true"></i> My Trees</span></Link>
                <LogOutButton className="nav-link-btn"/>
              </>
          )}
          {/* Always show this link since the about and Terms of Service page is not protected */}
          <Link to="/about"><span><i className="fa fa-user" aria-hidden="true"></i> About</span></Link>
          <Link to="/termsOfService"><span><i className="fa fa-gavel" aria-hidden="true"></i> Terms Of Service</span></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavigationBar);
