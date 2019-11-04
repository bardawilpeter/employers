/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { toast } from 'react-toastify';

import ApiConfig from '../../config/index';
import Loader from '../../components/Loader/Loader';
import MessageCaption from '../../components/MessageCaption/MessageCaption';
import './Confirm.css';

class Confirm extends Component {
    _isMounted = false;
    state = {
        confirmLoading: true
    };

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
        this.confirmEmail(this.props.match.params.verifyToken);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    confirmEmail = verifyToken => {
        const graphqlQuery = {
            query: `
      mutation{
        confirmEmail(
          verifyToken:"${verifyToken}") {
          id
        }
      }
        
      `
        };
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
                    throw new Error('Email already validated.');
                }
                toast.success('Account is now verified', {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true
                });
                this.props.history.push('/');
                this.setState({
                    confirmLoading: false
                });
            })
            .catch(() => {
                this.setState({
                    confirmLoading: false
                });
            });
    };

    render() {
        return (
            <>
                {this.state.confirmLoading ? (
                    <Loader />
                ) : (
                    <div className="wrapper">
                        <div className="confirm-alert">
                            <div className="confirm-alert-icon">
                                <span>&#9888;</span>
                            </div>
                            <div className="confirm-alert-message">
                                <MessageCaption
                                    message={`Email is already verified please go to
                                     the login page to be able to 
                                     use our employees dashboard.`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Confirm;
