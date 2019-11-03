import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import ApiConfig from './config/index';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import Members from './pages/Members/Members';
import Confirm from './pages/Confirm/Confirm';
import './App.css';

toast.configure();

const propTypes = {
    history: PropTypes.oneOfType([PropTypes.object, PropTypes.element])
};
const defaultProps = {
    history: {}
};

class App extends Component {
    state = {
        isAuth: false,
        reqLoading: false,
        error: null
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
        this.setStateAuthorization(true, token, userId);
        const remainingTime = new Date(expiryDate).getTime() - new Date().getTime();
        this.setAutoLogout(remainingTime);
    }

    setAutoLogout = remainingTime => {
        setTimeout(() => {
            this.logoutHandler();
        }, remainingTime);
    };

    setStateAuthorization = (isAuth, token, userId) => {
        this.setState({ isAuth, token, userId });
    };

    logoutHandler = () => {
        this.setState({ isAuth: false, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
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
        fetch(ApiConfig.graphqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.errors && resData.errors[0].status === 403) {
                    toast.success(
                        `Account is not active a 
                        verification email was sent to your email.`,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: true
                        }
                    );
                    throw new Error('User not active.');
                }
                if (resData.errors) {
                    this.setState({ reqLoading: false });
                    throw new Error('User login failed. check username or password.');
                }
                this.setState({
                    isAuth: true,
                    token: resData.data.userLogin.token,
                    userId: resData.data.userLogin.id,
                    reqLoading: false,
                    error: null
                });
                localStorage.setItem('token', resData.data.userLogin.token);
                localStorage.setItem('userId', resData.data.userLogin.userId);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
                localStorage.setItem('expiryDate', expiryDate.toISOString());
            })
            .catch(err => {
                this.setState({
                    isAuth: false,
                    reqLoading: false,
                    error: err
                });
            });
    };

    signupHandler = (event, authData) => {
        event.preventDefault();
        const { history } = this.props;
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
        this.setState({ reqLoading: true });
        fetch(ApiConfig.graphqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.errors) {
                    throw new Error('User creation failed check your email address');
                }
                toast.success('An email was sent to your account please verify.', {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true
                });
                this.setState({
                    isAuth: false,
                    reqLoading: false,
                    error: null
                });
                history.replace('/');
            })
            .catch(err => {
                this.setState({
                    isAuth: false,
                    reqLoading: false,
                    error: err
                });
            });
    };

    errorHandler = () => {
        this.setState({ error: null });
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
                            error={this.state.error}
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
                            loading={this.state.reqLoading}
                            error={this.state.error}
                        />
                    )}
                />
                <Route
                    path="/confirm/:verifyToken"
                    exact
                    render={props => <Confirm {...props} />}
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
                        render={() => (
                            <Members
                                userId={this.state.userId}
                                token={this.state.token}
                            />
                        )}
                    />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <>
                <Layout
                    header={
                        <MainNavigation
                            onLogout={this.logoutHandler}
                            onHandle={this.errorHandler}
                            isAuth={this.state.isAuth}
                        />
                    }
                />
                {routes}
            </>
        );
    }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default withRouter(App);
