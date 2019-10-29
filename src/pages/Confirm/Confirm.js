import React, { Component, Fragment } from "react";

import ApiConfig from "../../config/index";
import Loader from "../../components/Loader/Loader";
import MessageCaption from "../../components/MessageCaption/MessageCaption";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Confirm.css";

class Confirm extends Component {
  state = {
    confirmLoading: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.confirmEmail(id);
  }
  confirmEmail = id => {
    const graphqlQuery = {
      query: `
      mutation{
        confirmEmail(
          id:"${id}") {
          id
        }
      }
        
      `
    };
    fetch(ApiConfig.graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error("Email already validated.");
        }
        toast.success("Account is now verified", {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true
        });
        this.props.history.push("/");
        this.setState({
          confirmLoading: false
        });
      })
      .catch(err => {
        this.setState({
          confirmLoading: false
        });
      });
  };

  render() {
    return (
      <Fragment>
        {this.state.confirmLoading ? (
          <Loader />
        ) : (
          <div className="wrapper">
            <div className="confirm-alert">
              <div className="confirm-alert-icon">
                <span>&#9888;</span>
              </div>
              <div className="confirm-alert-message">
                <MessageCaption message="Email is already verified please go to the login page to be able to use our employees dashboard." />
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Confirm;
