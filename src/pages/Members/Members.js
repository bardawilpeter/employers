import React, { Component, Fragment } from 'react';

import MemberItem from '../../components/MemberItem/MemberItem';
import './Members.css';

class Members extends Component {
  render() {
    return (
      <Fragment>
        <section className="members-list">
        <MemberItem
            name={"john"}
            email={"john.doe@hotmail.com"}
            location={"xyz"}
            department={"dev"}
        />
        </section>
      </Fragment>
    );
  }
}

export default Members;
