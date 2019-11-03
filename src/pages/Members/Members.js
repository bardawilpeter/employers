import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MemberItem from '../../components/MemberItem/MemberItem';
import Button from '../../components/Button/Button';
import Pagination from '../../components/Pagination/Pagination';
import MemberForm from '../../components/MemberForm/MemberForm';
import SearchHolder from '../../components/SearchHolder/SearchHolder';
import Loader from '../../components/Loader/Loader';
import MessageCaption from '../../components/MessageCaption/MessageCaption';
import ApiConfig from '../../config/index';
import './Members.css';

const propTypes = {
    token: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
const defaultProps = {
    token: ''
};

class Members extends Component {
    state = {
        isEditing: false,
        members: [],
        totalMembers: 0,
        memberPage: 1,
        editMember: null,
        editLoading: false,
        searchQuery: null,
        membersLoading: true
    };

    componentDidMount() {
        this.loadMembers();
    }

    loadMembers = direction => {
        if (direction) {
            this.setState({
                members: [],
                membersLoading: true
            });
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
        let graphqlQuery = {
            query: `
            query {
                employees(page:${page}){
                  employeesList{
                      _id,
                      name,
                      email,
                      location,
                      department,
                      imageUrl,
                      createdAt
                  },
                  totalEmployees
                }
              }
          `
        };
        if (this.state.searchQuery) {
            graphqlQuery = {
                query: `
                query {
                    search(page:${page},searchValue:"${this.state.searchQuery}"){
                      employeesList{
                        _id,
                        name,
                        email,
                        location,
                        department,
                        imageUrl,
                        createdAt
                      },
                      totalEmployees
                    }
                  }
                `
            };
        }
        fetch(ApiConfig.graphqlUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => res.json())
            .then(resData => {
                if (resData.errors && resData.errors[0].status === 401) {
                    throw new Error('User not authenticated.');
                }
                if (resData.errors) {
                    throw new Error('Failed to get members.');
                }
                const queryReturnedType =
                    resData.data.search != null ? 'search' : 'employees';
                this.setState({
                    members: resData.data[queryReturnedType].employeesList.map(
                        member => ({
                            ...member,
                            imageUrl: member.imageUrl
                        })
                    ),
                    totalMembers: resData.data[queryReturnedType].totalEmployees,
                    membersLoading: false
                });
            })
            .catch(err => {
                throw err;
            });
    };

    newMemberHandler = () => {
        this.setState({ isEditing: true });
    };

    startEditMemberHandler = memberId => {
        this.setState(prevState => {
            const getMember = {
                ...prevState.members.find(p => p._id === memberId)
            };

            return {
                isEditing: true,
                editMember: getMember
            };
        });
    };

    cancelEditHandler = () => {
        this.setState({ isEditing: false, editMember: null });
    };

    finishEditHandler = MemberData => {
        this.setState({ editLoading: true });
        const formData = new FormData();
        formData.append('image', MemberData.image);
        fetch(ApiConfig.imageUploadUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${this.props.token}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(fileResData => {
                const imageUrl = !fileResData.imageUrl
                    ? this.state.editMember.imageUrl
                    : fileResData.imageUrl;
                let graphqlQuery = {
                    query: `
            mutation {
            createEmployee(
                name: "${MemberData.name}", 
                email:"${MemberData.email}",
                location:"${MemberData.location}", 
                department:"${MemberData.department}",
                imageUrl:"${imageUrl}"
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
                if (this.state.editMember) {
                    graphqlQuery = {
                        query: `
              mutation {
                updateEmployee(
                    id:"${this.state.editMember._id}",
                    name: "${MemberData.name}", 
                    email:"${MemberData.email}",
                    location:"${MemberData.location}", 
                    department:"${MemberData.department}",
                    imageUrl:"${imageUrl}"
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
                }

                return fetch(ApiConfig.graphqlUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.props.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(graphqlQuery)
                });
            })
            .then(res => res.json())
            .then(resData => {
                this.setState({ editLoading: false });
                if (resData.errors) {
                    throw new Error('User not authenticated.');
                }
                const queryReturnedType = this.state.editMember
                    ? 'updateEmployee'
                    : 'createEmployee';
                const member = {
                    _id: resData.data[queryReturnedType]._id,
                    name: resData.data[queryReturnedType].name,
                    email: resData.data[queryReturnedType].email,
                    location: resData.data[queryReturnedType].location,
                    imageUrl: resData.data[queryReturnedType].imageUrl,
                    department: resData.data[queryReturnedType].department,
                    createdAt: new Date(
                        resData.data[queryReturnedType].createdAt
                    ).toLocaleDateString('en-US')
                };
                this.setState(prevState => {
                    const updatedMembers = [...prevState.members];
                    let updatedTotalMembers = prevState.totalMembers;
                    if (prevState.editMember) {
                        const getMemberIndex = prevState.members.findIndex(m => {
                            return m._id === prevState.editMember._id;
                        });
                        updatedMembers[getMemberIndex] = member;
                    } else {
                        updatedTotalMembers++;
                        if (prevState.members.length >= 4) {
                            updatedMembers.pop();
                        }
                        updatedMembers.unshift(member);
                    }
                    return {
                        members: updatedMembers,
                        isEditing: false,
                        editMember: null,
                        totalMembers: updatedTotalMembers
                    };
                });
            })
            .catch(err => {
                this.setState({
                    isEditing: false,
                    editLoading: false
                });
                throw err;
            });
    };

    deleteMemberHandler = memberId => {
        this.setState({
            membersLoading: true,
            members: []
        });
        const graphqlQuery = {
            query: `
            mutation {
              remove(id: "${memberId}"){
                  _id
              }
            }
          `
        };
        fetch(ApiConfig.graphqlUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => res.json())
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

    memberSearchChangeHandler = (input, value) => {
        this.setState(
            {
                searchQuery: value !== '' ? value : null,
                members: [],
                memberPage: 1,
                membersLoading: true
            },
            () => {
                this.loadMembers();
            }
        );
    };

    render() {
        return (
            <>
                <MemberForm
                    editing={this.state.isEditing}
                    selectedMember={this.state.editMember}
                    loading={this.state.editLoading}
                    onCancelEdit={this.cancelEditHandler}
                    onFinishEdit={this.finishEditHandler}
                />
                <div className="wrapper">
                    <SearchHolder onFinishSearch={this.memberSearchChangeHandler} />
                    <section className="member-action">
                        <Button onClick={this.newMemberHandler}>Add Member</Button>
                    </section>
                    <section className="members-list">
                        {this.state.membersLoading && <Loader />}

                        {this.state.members.length <= 0 && !this.state.membersLoading ? (
                            <MessageCaption message="No members found" />
                        ) : null}
                        <Pagination
                            onPrevious={this.loadMembers.bind(this, 'previous')}
                            onNext={this.loadMembers.bind(this, 'next')}
                            lastPage={Math.ceil(this.state.totalMembers / 4)}
                            currentPage={this.state.memberPage}
                        >
                            <div className="members-list-holder">
                                {this.state.members.map(member => (
                                    <MemberItem
                                        key={member._id}
                                        id={member._id}
                                        email={member.email}
                                        date={new Date(
                                            member.createdAt
                                        ).toLocaleDateString('en-US')}
                                        name={member.name}
                                        location={member.location}
                                        department={member.department}
                                        imageUrl={member.imageUrl}
                                        onStartEdit={this.startEditMemberHandler.bind(
                                            this,
                                            member._id
                                        )}
                                        onDelete={this.deleteMemberHandler.bind(
                                            this,
                                            member._id
                                        )}
                                    />
                                ))}
                            </div>
                        </Pagination>
                    </section>
                </div>
            </>
        );
    }
}

Members.propTypes = propTypes;
Members.defaultProps = defaultProps;

export default Members;
