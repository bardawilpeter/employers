import React from 'react';
import logoImage from '../../logo.svg';
import './Logo.css';

const logo = () => (
    <div className="logo">
        <img src={logoImage} className="App-logo" alt="logo" />
    </div>
);

export default logo;
