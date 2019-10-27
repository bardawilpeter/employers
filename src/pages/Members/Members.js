import React, { Component, Fragment } from "react";

import MemberItem from "../../components/MemberItem/MemberItem";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import MemberForm from "../../components/MemberForm/MemberForm";
import SearchHolder from "../../components/SearchHolder/SearchHolder";
import "./Members.css";

class Members extends Component {
  state = {
    isEditing: false,
    members: [],
    totalMembers: 0,
    memberPage: 1,
    editMember: null,
    editLoading: false,
    searchQuery: null
  };

  componentDidMount() {
    this.loadMembers();
  }

  loadMembers = direction => {
    if (direction) {
      this.setState({ members: [] });
    }
    let page = this.state.memberPage;
    if (direction === "next") {
      page++;
      this.setState({ memberPage: page });
    }
    if (direction === "previous") {
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
    fetch("http://localhost:3033/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error("Failed to get members.");
        }
        let queryReturnedType =
          resData.data.search != null ? "search" : "employees";
        this.setState({
          members: resData.data[queryReturnedType].employeesList.map(member => {
            return {
              ...member,
              imageUrl: member.imageUrl
            };
          }),
          totalMembers: resData.data[queryReturnedType].totalEmployees
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
      const getMember = { ...prevState.members.find(p => p._id === memberId) };

      return {
        isEditing: true,
        editMember: getMember
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false });
  };

  finishEditHandler = MemberData => {
    console.log(MemberData);
    const formData = new FormData();
    formData.append("image", MemberData.image);
    fetch("http://localhost:3033/image-upload", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + this.props.token
      },
      body: formData
    })
      .then(res => res.json())
      .then(fileResData => {
        const imageUrl = fileResData.imageUrl || "undefined";
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

        return fetch("http://localhost:3033/graphql", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + this.props.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(graphqlQuery)
        });
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error("Validation failed. check you email address.");
        }
        if (resData.errors) {
          throw new Error("User not authenticated.");
        }
        let queryReturnedType = this.state.editMember
          ? "updateEmployee"
          : "createEmployee";
        const member = {
          _id: resData.data[queryReturnedType]._id,
          name: resData.data[queryReturnedType].name,
          email: resData.data[queryReturnedType].email,
          location: resData.data[queryReturnedType].location,
          imageUrl: resData.data[queryReturnedType].imageUrl,
          department: resData.data[queryReturnedType].department,
          createdAt: new Date(
            resData.data[queryReturnedType].createdAt
          ).toLocaleDateString("en-US")
        };
        this.setState(prevState => {
          let updatedMembers = [...prevState.members];
          let updatedTotalMembers = prevState.totalMembers;
          if (prevState.editMember) {
            const getMemberIndex = prevState.members.findIndex(
              m => m._id === prevState.editMember._id
            );
            updatedMembers[getMemberIndex] = member;
          } else {
            updatedTotalMembers++;
            if (prevState.members.length >= 2) {
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
    fetch("http://localhost:3033/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error("Cannot delete member.");
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
        searchQuery: value !== "" ? value : null,
        memberPage: 1
      },
      () => {
        this.loadMembers();
      }
    );
  };

  render() {
    return (
      <Fragment>
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
            <Pagination
              onPrevious={this.loadMembers.bind(this, "previous")}
              onNext={this.loadMembers.bind(this, "next")}
              lastPage={Math.ceil(this.state.totalMembers / 4)}
              currentPage={this.state.memberPage}
            >
              <div className="members-list-holder">
                {this.state.members.map(member => (
                  <MemberItem
                    key={member._id}
                    id={member._id}
                    email={member.email}
                    date={new Date(member.createdAt).toLocaleDateString(
                      "en-US"
                    )}
                    name={member.name}
                    location={member.location}
                    department={member.department}
                    imageUrl={member.imageUrl}
                    onStartEdit={this.startEditMemberHandler.bind(
                      this,
                      member._id
                    )}
                    onDelete={this.deleteMemberHandler.bind(this, member._id)}
                  />
                ))}
              </div>
            </Pagination>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default Members;
