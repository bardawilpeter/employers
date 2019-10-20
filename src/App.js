import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import './App.css';

class App extends Component {
  state = {
    isAuth: false,
    reqLoading: false
  };

  
  loginHandler = (event, authData) => {
    event.preventDefault();
    const graphqlQuery = {
      query: `
      query{
        userLogin(
          email:"${authData.email}",
          password:"${authData.password}") {
          id,
          token
        }
      }
        
      `
    };
    this.setState({ reqLoading: true });
    fetch('http://localhost:3033/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          this.setState({ reqLoading: false });
          throw new Error('User login failed. check username or password.');
        }
        console.log(resData);
       
        this.setState({
          isAuth: true,
          token: resData.data.userLogin.token,
          userId: resData.data.userLogin.id,
          reqLoading:false
        });
        //TODO add token to storage after authentication
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          reqLoading:false
        });
      });
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ reqLoading: true });
    const graphqlQuery = {
      query: `
      mutation {
        signup(
          name: "${authData.signupForm.name.value}", 
          email:"${authData.signupForm.email.value}",
          password:"${authData.signupForm.password.value}"
        ) {
          id
        }
      }
      `
    };
    fetch('http://localhost:3033/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      if (resData.errors && resData.errors[0].status === 422) {
        throw new Error(
          "Validation failed. check you email address"
        );
      }
      if (resData.errors) {
        throw new Error('User creation failed');
      }
      this.setState({ isAuth: false, reqLoading: false });
      this.props.history.replace('/');
    })
    .catch(err => {
      this.setState({
        isAuth: false,
        reqLoading: false,
        error: err
      });
    });
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.reqLoading}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
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
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
              />
          }
        />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
