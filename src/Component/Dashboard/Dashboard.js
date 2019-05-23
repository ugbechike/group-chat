import React, { Component } from "react";
import Chatbox from "../ChatBox/ChatBox";
import Channels from "../Channels/Channels";

export default class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        group: "supergroup",
        startChatStatus: false
      };
    }
  
    // recieve event from props and update the state with the data
    updateState = (group) => {
      this.setState({ group: group }, () => {
        return { group: group };
      });
  
      this.setState({ startChatStatus: true });
    }
  
    render() {
      return (
        <React.Fragment>
          <div className="cover">
          <div className="side_bar" >
          <Channels updateState={this.updateState} />
          </div>
          <div className="main">
          <Chatbox state={this.state} />
          </div>
          </div>
        </React.Fragment>
      );
    }
  }