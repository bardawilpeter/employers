import React from "react";

import Input from "../../components/Form/Input/Input";
import "./SearchHolder.css";

const searchHolder = props => (
  <div className="search-holder">
    <Input
      id="search"
      label="Search"
      placeholder="Search by member name, department and location"
      control="input"
      onChange={props.onFinishSearch}
    />
  </div>
);

export default searchHolder;
