import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Import components to be used on this component
import LogOutButton from '../LogOutButton/LogOutButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavigationBar = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav">
    <Navbar.Brand href="/">
        <img alt="" src="./images/Maximum_1_Logo.png"
          className="d-inline-block align-top"
        />{' '}
        Maximum 1 Life App
    </Navbar.Brand>
    {/* Creates the hamburger menu */}
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    {/* A links will be in the dropdown must be children of Collapse */}
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
        <Nav.Link href="/">{props.user.id ? 'Home' : 'Login / Register'}</Nav.Link>
        {/* Show the link to the My Trees and the logout button if the user is logged in */}
        {props.user.id && (
            <>
              <Nav.Link><Link to="/my-tree">My Trees</Link></Nav.Link>
              <Nav.Link><LogOutButton /></Nav.Link>
            </>
        )}
        {/* Always show this link since the about and Terms of Service page is not protected */}
        <Nav.Link ><Link to="/about">About</Link></Nav.Link>
        <Nav.Link><Link to="/termsOfService">Terms Of Service</Link></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavigationBar);
