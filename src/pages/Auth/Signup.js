import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import Auth from './Auth';

class Signup extends Component {
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
            id="name"
            label="Name"
            type="text"
            control="input"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
          />
          <Button design="raised" type="submit">
            Signup
          </Button>
        </form>
      </Auth>
    );
  }
}

export default Signup;
