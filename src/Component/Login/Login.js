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
        console.log("Login Successful:", { user });
        this.setState({ redirect: true });
      },
      error => {
        console.log("Login failed with exception:", { error });
        this.setState({
          error: "Login failed, please enter a valid username",
          isLoading: false
        });
      }
    );
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="login">
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
          <div className="signup-text">
            <p>To Create account</p>
            <p>
              Create one from the{" "}
              <a href="https://app.CometChat.com/" target="blank">
                CometChat Pro dashboard
              </a>
            </p>
            <p>
              feel free to use the test usernames: superhero1, superhero2,
              superhero3 to login
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}