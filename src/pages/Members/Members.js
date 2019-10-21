import React, { Component, Fragment } from 'react';

import MemberItem from '../../components/MemberItem/MemberItem';
import Pagination from '../../components/Pagination/Pagination';
import './Members.css';

class Members extends Component {
    state = {
        members: [],
        memberPage: 1,
        totalEmployees: 0
    };

    componentDidMount() {
        this.loadMembers();
    }

    loadMembers = direction => {
        if (direction) {
            this.setState({ members: [] });
          }
          let page = this.state.memberPage;
          if (direction === 'next') {
            page++;
            this.setState({ memberPage: page });
          }
          if (direction === 'previous') {
            page--;
            this.setState({ memberPage: page });
          }
        const graphqlQuery = {
            query: `
            query {
                employees(page:${page}){
                  employeesList{
                      _id,
                      name,
                      email,
                      location,
                      department,
                      createdAt
                  },
                  totalEmployees
                }
              }
          `
        };
        fetch('http://localhost:3033/graphql', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                    throw new Error('Failed to get members.');
                }
                this.setState({
                    members: resData.data.employees.employeesList.map(member => {
                        return {
                            ...member,
                            imagePath: member.imageUrl
                        };
                    }),
                    totalEmployees: resData.data.employees.totalEmployees
                });
            })
            .catch(err => {
                throw err;
            });
    };

    deleteMemberHandler = memberId => {
        const graphqlQuery = {
            query: `
            mutation {
              remove(id: "${memberId}"){
                  _id
              }
            }
          `
        };
        fetch('http://localhost:3033/graphql', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if (resData.errors) {
                    throw new Error('Cannot delete member.');
                }
                this.loadMembers();
            })
            .catch(err => {
                throw err;
            });
    };

    render() {
        return (
            <Fragment>
                <section className="members-list">
                    <Pagination
                        onPrevious={this.loadMembers.bind(this, 'previous')}
                        onNext={this.loadMembers.bind(this, 'next')}
                        lastPage={Math.ceil(this.state.totalEmployees / 2)}
                        currentPage={this.state.memberPage}
                    >
                        {this.state.members.map(member => (
                            <MemberItem
                                key={member._id}
                                id={member._id}
                                email={member.email}
                                date={new Date(member.createdAt).toLocaleDateString('en-US')}
                                name={member.name}
                                location={member.location}
                                department={member.department}
                                image={member.imagePath}
                                onDelete={this.deleteMemberHandler.bind(this, member._id)}
                            />
                        ))}
                    </Pagination>
                </section>
            </Fragment>
        );
    }
}

export default Members;
