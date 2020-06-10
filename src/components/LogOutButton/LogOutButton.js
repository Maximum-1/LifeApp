import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// the logOutButton is imported in the JavigationBar.js
const LogOutButton = props => (
  <Link
    to="/"
    // dispatch to loginSaga.js -- LOGOUT
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    <i className="fa fa-sign-out" aria-hidden="true"></i> Log Out
  </Link>
);

export default connect()(LogOutButton);
