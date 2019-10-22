import React, { Component, Fragment } from 'react';

import FormHolder from '../FormHolder/FormHolder';
import Input from '../Form/Input/Input';
import { required, length } from '../../util/validators';
import './MemberForm.css';

const MEMBER_INIIAL_FORM = {
  name: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  email: {
    value: '',
    valid: false,
    touched: false,
    validators: [required]
  },
  location: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  department: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  }
};

class MemberForm extends Component {
  state = {
    memberForm: MEMBER_INIIAL_FORM,
    formIsValid: false
  };


  memberInputChangeHandler = (input, value, files) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.memberForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.memberForm,
        [input]: {
          ...prevState.memberForm[input],
          valid: isValid,
          value: value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        memberForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        memberForm: {
          ...prevState.memberForm,
          [input]: {
            ...prevState.memberForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelMemberChangeHandler = () => {
    this.setState({
      memberForm: MEMBER_INIIAL_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  submitMemberChangeHandler = () => {
    const member = {
      name: this.state.memberForm.name.value,
      email: this.state.memberForm.email.value,
      location: this.state.memberForm.location.value,
      department: this.state.memberForm.department.value
    };
    this.props.onFinishEdit(member);
    this.setState({
      memberForm: MEMBER_INIIAL_FORM,
      formIsValid: false
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <FormHolder
          title="New Member"
          submitEnabled={this.state.formIsValid}
          onCancelForm={this.cancelMemberChangeHandler}
          onSubmitForm={this.submitMemberChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="name"
              label="Name"
              control="input"
              onChange={this.memberInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'name')}
              valid={this.state.memberForm['name'].valid}
              touched={this.state.memberForm['name'].touched}
              value={this.state.memberForm['name'].value}
            />
             <Input
              id="email"
              label="Email"
              control="input"
              onChange={this.memberInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'email')}
              valid={this.state.memberForm['email'].valid}
              touched={this.state.memberForm['email'].touched}
              value={this.state.memberForm['email'].value}
            />
             <Input
              id="location"
              label="Location"
              control="input"
              onChange={this.memberInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'location')}
              valid={this.state.memberForm['location'].valid}
              touched={this.state.memberForm['location'].touched}
              value={this.state.memberForm['location'].value}
            />
             <Input
              id="department"
              label="Department"
              control="input"
              onChange={this.memberInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'department')}
              valid={this.state.memberForm['department'].valid}
              touched={this.state.memberForm['department'].touched}
              value={this.state.memberForm['department'].value}
            />
          </form>
        </FormHolder>
      </Fragment>
    ) : null;
  }
}

export default MemberForm;
