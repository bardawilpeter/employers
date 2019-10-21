import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import Members from './pages/Members/Members';
import './App.css';

class App extends Component {
  state = {
    isAuth: false,
    reqLoading: false
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    this.setState({ isAuth: true, token: token, userId: userId });
    const remainingTime=new Date(expiryDate).getTime() - new Date().getTime();
    this.setAutoLogout(remainingTime)
  }

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
          reqLoading: false
        });
        localStorage.setItem('token', resData.data.userLogin.token);
        localStorage.setItem('userId', resData.data.userLogin.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          reqLoading: false
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

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  setAutoLogout = remainingTime => {
    setTimeout(() => {
      this.logoutHandler();
    }, remainingTime);
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
    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Members
              userId={this.state.userId} token={this.state.token}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }
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
