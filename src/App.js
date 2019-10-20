import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import './App.css';


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignupPage
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <Fragment>
        <Layout
          header={
              <MainNavigation
              />
          }
        />
        {routes}
      </Fragment>
    );
  }
}

export default App;
