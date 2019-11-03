import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormHolder from '../FormHolder/FormHolder';
import Input from '../Form/Input/Input';
import FileField from '../Form/Input/FileField';
import Loader from '../Loader/Loader';
import { required, length, email, file } from '../../util/validators';
import './MemberForm.css';

const propTypes = {
    editing: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    selectedMember: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    onCancelEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    onFinishEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};

const defaultProps = {
    editing: false,
    selectedMember: {},
    loading: false,
    onCancelEdit: () => {},
    onFinishEdit: () => {}
};

const MEMBER_INIIAL_FORM = {
    name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
    },
    image: {
        value: '',
        valid: false,
        touched: false,
        validators: [file({ max: 1 })]
    },
    email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
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

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.editing &&
            prevProps.selectedMember !== this.props.selectedMember
        ) {
            const memberForm = {
                name: {
                    ...prevState.memberForm.name,
                    value: this.props.selectedMember.name,
                    valid: true
                },
                image: {
                    ...prevState.memberForm.image,
                    value: this.props.selectedMember.imageUrl,
                    valid: true
                },
                email: {
                    ...prevState.memberForm.email,
                    value: this.props.selectedMember.email,
                    valid: true
                },
                location: {
                    ...prevState.memberForm.location,
                    value: this.props.selectedMember.location,
                    valid: true
                },
                department: {
                    ...prevState.memberForm.department,
                    value: this.props.selectedMember.department,
                    valid: true
                }
            };
            this.updateStateMemberForm(memberForm);
        }
    }

    updateStateMemberForm = memberForm => {
        this.setState({ memberForm, formIsValid: true });
    };

    memberInputChangeHandler = (input, value, files) => {
        this.setState(prevState => {
            let isValid = true;
            prevState.memberForm[input].validators.map(validator => {
                isValid = files
                    ? isValid && validator(files)
                    : isValid && validator(value);
                return isValid;
            });
            const updatedForm = {
                ...prevState.memberForm,
                [input]: {
                    ...prevState.memberForm[input],
                    valid: isValid,
                    value: files ? files[0] : value
                }
            };
            let formIsValid = true;
            Object.keys(updatedForm).map(inputName => {
                formIsValid = formIsValid && updatedForm[inputName].valid;
                return formIsValid;
            });
            return {
                memberForm: updatedForm,
                formIsValid
            };
        });
    };

    inputBlurHandler = input => {
        this.setState(prevState => ({
            memberForm: {
                ...prevState.memberForm,
                [input]: {
                    ...prevState.memberForm[input],
                    touched: true
                }
            }
        }));
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
            image: this.state.memberForm.image.value,
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
            <>
                <FormHolder
                    title={this.props.selectedMember ? 'Edit Member' : 'New Member'}
                    submitEnabled={this.state.formIsValid}
                    onCancelForm={this.cancelMemberChangeHandler}
                    onSubmitForm={this.submitMemberChangeHandler}
                    isLoading={this.props.loading}
                >
                    {this.props.loading && (
                        <div className="form-loader-holder">
                            <Loader />
                        </div>
                    )}
                    <form>
                        <Input
                            id="name"
                            label="Full Name*"
                            control="input"
                            required
                            onChange={this.memberInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'name')}
                            valid={this.state.memberForm.name.valid}
                            touched={this.state.memberForm.name.touched}
                            value={this.state.memberForm.name.value}
                        />
                        <Input
                            id="email"
                            label="Email*"
                            control="input"
                            required
                            onChange={this.memberInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'email')}
                            valid={this.state.memberForm.email.valid}
                            touched={this.state.memberForm.email.touched}
                            value={this.state.memberForm.email.value}
                        />
                        <Input
                            id="location"
                            label="Location*"
                            control="input"
                            required
                            onChange={this.memberInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'location')}
                            valid={this.state.memberForm.location.valid}
                            touched={this.state.memberForm.location.touched}
                            value={this.state.memberForm.location.value}
                        />
                        <Input
                            id="department"
                            label="Department*"
                            control="input"
                            required
                            onChange={this.memberInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'department')}
                            valid={this.state.memberForm.department.valid}
                            touched={this.state.memberForm.department.touched}
                            value={this.state.memberForm.department.value}
                        />
                        <FileField
                            id="image"
                            label={`Image*
                             (extension must be:jpg, jpeg, png and size below 1MB)`}
                            control="input"
                            required
                            onChange={this.memberInputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'image')}
                            valid={this.state.memberForm.image.valid}
                            touched={this.state.memberForm.image.touched}
                        />
                    </form>
                </FormHolder>
            </>
        ) : null;
    }
}

MemberForm.propTypes = propTypes;
MemberForm.defaultProps = defaultProps;

export default MemberForm;
