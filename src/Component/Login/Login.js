import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat" 
import { API_KEY } from "../../cometConfig";
import "./index.css";
import Loader from '../Loader/SmallLoader'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      userName: "",
      isLoading: false,
      error: ""
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.login();
    this.setState({ isLoading: true, error: "" });
  }

  handleUserInput = (e) => {
    this.setState({ userName: e.target.value.toUpperCase() });
  }

  renderRedirect = () => {
    return <Redirect to="/dashboard" />;
  };

  login = () => {
    // Do not expose your API key here.
    CometChat.login(this.state.userName, API_KEY).then(
      user => {
        this.setState({ redirect: true });
        return user
      },
      error => {
        this.setState({
          error: "Login failed, please enter a valid username",
          isLoading: false
        });
        return error
      }
    );
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="login">
        <div>
          <h4>Welcome to Your React Chat App</h4>
          {!this.state.redirect ? "" : this.renderRedirect()}
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  className="groupname"
                  placeholder="Enter Your Username"
                  onChange={this.handleUserInput}
                />
              </div>
              <button className="button modal-button">Login</button>
            </form>
            <div className="error">{this.state.error}</div>
              {this.state.isLoading ? (
                <Loader />
              ) : (
                ""
              )}
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}