import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import TitleCaption from '../../components/Form/TitleCaption/TitleCaption';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

const propTypes = {
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onLogin: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
const defaultProps = {
    error: {},
    loading: false,
    onLogin: () => {}
};

class Login extends Component {
    state = {
        loginForm: {
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email]
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 5 })]
            },
            formIsValid: false
        }
    };

    inputChangeHandler = (input, value) => {
        this.setState(prevState => {
            let isValid = true;
            prevState.loginForm[input].validators.map(validator => {
                isValid = isValid && validator(value);
                return isValid;
            });
            const updatedForm = {
                ...prevState.loginForm,
                [input]: {
                    ...prevState.loginForm[input],
                    valid: isValid,
                    value
                }
            };
            let formIsValid = true;
            Object.keys(updatedForm).map(inputName => {
                formIsValid = formIsValid && updatedForm[inputName].valid;
                return formIsValid;
            });
            return {
                loginForm: updatedForm,
                formIsValid
            };
        });
    };

    inputBlurHandler = input => {
        this.setState(prevState => ({
            loginForm: {
                ...prevState.loginForm,
                [input]: {
                    ...prevState.loginForm[input],
                    touched: true
                }
            }
        }));
    };

    render() {
        return (
            <Auth>
                <TitleCaption title="Sign in" />
                <ErrorHandler error={this.props.error} />
                <form
                    onSubmit={e =>
                        this.props.onLogin(e, {
                            email: this.state.loginForm.email.value,
                            password: this.state.loginForm.password.value
                        })
                    }
                >
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        control="input"
                        required
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler.bind(this, 'email')}
                        value={this.state.loginForm.email.value}
                        valid={this.state.loginForm.email.valid}
                        touched={this.state.loginForm.email.touched}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        control="input"
                        required
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler.bind(this, 'password')}
                        value={this.state.loginForm.password.value}
                        valid={this.state.loginForm.password.valid}
                        touched={this.state.loginForm.password.touched}
                    />
                    <Button type="submit" loading={this.props.loading}>
                        Log in
                    </Button>
                </form>
            </Auth>
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
