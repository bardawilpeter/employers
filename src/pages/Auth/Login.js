import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import Auth from './Auth';

class Login extends Component {
    render() {
        return (
            <Auth>
                <form>
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        control="input"
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        control="input"
                    />
                    <Button type="submit">
                        Login
                    </Button>
                </form>
            </Auth>
        );
    }
}

export default Login;