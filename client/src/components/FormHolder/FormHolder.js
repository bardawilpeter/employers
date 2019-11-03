import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import './FormHolder.css';

const FormHolder = props =>
    ReactDOM.createPortal(
        <div className="form-holder">
            <div className="form-holder-header">
                <h2>{props.title}</h2>
            </div>
            <div className="form-holder-content">{props.children}</div>
            <div className="form-holder-actions">
                <Button onClick={props.onCancelForm}>Cancel</Button>
                <Button
                    onClick={props.onSubmitForm}
                    disabled={!props.submitEnabled}
                    loading={props.isLoading}
                >
                    Submit
                </Button>
            </div>
        </div>,
        document.getElementById('form-root')
    );

export default FormHolder;
