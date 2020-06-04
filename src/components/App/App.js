import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import NavigationBar from '../NavigationBar/NavigationBar';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//Pages
import AboutPage from '../Pages/AboutPage/AboutPage';
import UserPage from '../Pages/UserPage/UserPage';
import MyTreePage from '../Pages/MyTreePage/MyTreePage';
import TermsOfServicePage from '../Pages/TermsOfServicePage/TermsOfServicePage';
import PhasesPage from '../Pages/PhasesPage/PhasesPage';
import StepPage from '../Pages/StepPage/StepPage';
import SummariesPage from '../Pages/SummariesPage/SummariesPage'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
              This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* Visiting localhost:3000/about will show the about page.
              This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/termsOfService"
              component={TermsOfServicePage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/my-tree"
              component={MyTreePage}
            />
            <ProtectedRoute
              exact
              //if using params to pass id use /phases/:id
              //if using query strings no /:id
              path="/phases"
              component={PhasesPage}
            />
            <ProtectedRoute
              exact
              //if using params to pass id use /step/:id
              //if using query strings no /:id
              path="/step"
              component={StepPage}
            />
            <ProtectedRoute
              exact
              //if using params to pass id use /phases/:id
              //if using query strings no /:id
              path="/summaries"
              component={SummariesPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
