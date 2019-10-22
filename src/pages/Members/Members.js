import React, { Component, Fragment } from 'react';

import MemberItem from '../../components/MemberItem/MemberItem';
import Button from '../../components/Button/Button';
import Pagination from '../../components/Pagination/Pagination';
import MemberForm from '../../components/MemberForm/MemberForm';
import './Members.css';

class Members extends Component {
    state = {
        isEditing: false,
        members: [],
        totalMembers: 0,
        memberPage: 1,
        editLoading: false
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
                    totalMembers: resData.data.employees.totalEmployees
                });
            })
            .catch(err => {
                throw err;
            });
    };


    newMemberHandler = () => {
        this.setState({ isEditing: true });
    };

    cancelEditHandler = () => {
        this.setState({ isEditing: false });
    };

    finishEditHandler = MemberData => {

        const graphqlQuery = {
            query: `
            mutation {
            createEmployee(
                name: "${MemberData.name}", 
                email:"${MemberData.email}",
                location:"${MemberData.location}", 
                department:"${MemberData.department}",
                imageUrl:"qwqwqwq"
              ) {
                _id,
                name,
                email,
                location,
                department,
                imageUrl,
                createdAt
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
                if (resData.errors && resData.errors[0].status === 422) {
                    throw new Error(
                        "Validation failed. check you email address."
                    );
                }
                if (resData.errors) {
                    throw new Error('User not authenticated.');
                }
                const member = {
                    _id: resData.data.createEmployee._id,
                    name: resData.data.createEmployee.name,
                    email: resData.data.createEmployee.email,
                    location: resData.data.createEmployee.location,
                    department: resData.data.createEmployee.department,
                    createdAt: new Date(resData.data.createEmployee.createdAt).toLocaleDateString('en-US')
                };
                this.setState(prevState => {
                    let updatedMembers = [...prevState.members];
                    let updatedTotalMembers = prevState.totalMembers;
                    updatedTotalMembers++;
                    if (prevState.members.length >= 2) {
                        updatedMembers.pop();
                    }
                    updatedMembers.unshift(member);
                    return {
                        members: updatedMembers,
                        isEditing: false,
                        totalMembers: updatedTotalMembers
                    };
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isEditing: false,
                    error: err
                });
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
                <MemberForm
                    editing={this.state.isEditing}
                    loading={this.state.editLoading}
                    onCancelEdit={this.cancelEditHandler}
                    onFinishEdit={this.finishEditHandler}
                />
                <section className="feed__control">
                    <Button onClick={this.newMemberHandler}>
                        New Member
                    </Button>
                </section>
                <section className="members-list">
                    <Pagination
                        onPrevious={this.loadMembers.bind(this, 'previous')}
                        onNext={this.loadMembers.bind(this, 'next')}
                        lastPage={Math.ceil(this.state.totalMembers / 2)}
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
