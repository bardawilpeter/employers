import React from 'react';

import Input from '../../components/Form/Input/Input';
import './SearchHolder.css';

const searchHolder = props => (
    <div className="search-holder">
        <Input
            id="search"
            label="Search"
            control="input"
            onChange={props.onFinishSearch}
        />
    </div>
);

export default searchHolder;
