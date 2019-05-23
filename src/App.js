import React, {Component} from 'react';
import { CometChat } from "@cometchat-pro/chat" 
import {API_ID} from "./cometConfig";
import Chatbox from "./Component/ChatBox/ChatBox"
import ChatHome from "./Component/Dashboard/Dashboard";
import Login from "./Component/Login/Login";
import CreateGroup from "./Component/ChannelPlatform/ChannelList";
import { Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    
    CometChat.init(API_ID).then(
      hasInitialized => {
        return hasInitialized;
      },
      error => {
       return error;
      }
    );
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/chat" component={Chatbox} />
            <Route path="/dashboard" component={ChatHome} />
            <Route path="/creategroup" component={CreateGroup} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App