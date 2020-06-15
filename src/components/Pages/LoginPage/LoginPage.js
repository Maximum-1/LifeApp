import React, { Component } from 'react';
import { connect } from 'react-redux';

// Login page to allow user rigister and login
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  // login info 
  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  // handle the input of the login info
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        
        <div className="buffer-space"></div>
        <center>
          <form onSubmit={this.login}>
            <div>
                <input
                  className="login-register"
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
            </div>
            <div>
                <input
                  className="login-register"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
            </div>
            <div>
              <button
                className="log-in"
                type="submit"
                name="submit"
              >Login</button>
            </div>
          </form>
            <div>
              <span>New here? </span>
              <button
                type="button"
                className="link-button"
                onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
              >
                Create Account
              </button>
            </div>
            <div>
              <span>By logging in you agree to Maximum 1's </span><a className="aTag" href="/#/termsOfService">Terms of Service</a>
            </div>
          </center>
          <div className="buffer-space"></div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
