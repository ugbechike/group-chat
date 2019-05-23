import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import "./index.css";

export default class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRecieverId: this.props.state.group,
      chat: null,
      groupMessage: [],
      user: {},
      name: null,
      file: ''
    };
    
    this.fileType = CometChat.MESSAGE_TYPE.FILE
    this.userRecieverId = this.state.userRecieverId;
    this.messageType = CometChat.MESSAGE_TYPE.TEXT;
    this.receiverType = CometChat.RECEIVER_TYPE.GROUP;
    this.limit = 30;
  }

  //WHEN COMPONENT UPDATES, WE CHECK IF THE IF THE USER RECEIVING THE MESSAGE IS ASSIGNED TO THE GROUP.
  componentDidUpdate() {
    this.updateUser = this.state.userRecieverId;
    if (this.updateUser !== this.props.state.group) {
      this.setState({ userRecieverId: this.props.state.group }, () => {
        this.updateMessage();
        return {  userRecieverId: this.props.state.group };
      });
    } else {
    }
  }

  
  componentDidMount() {
    this.getUser();
  }

  updateMessage = () => {
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(this.props.state.group)
      .setLimit(this.limit)
      .build();

    this.scrollToBottom();

    this.messagesRequest.fetchPrevious().then(
      messages => {
        console.log("file inside message", messages)
        this.setState({ groupMessage: [] }, () => {
          return { groupMessage: [] };
        });
        this.setState({ groupMessage: messages }, () => {
          return { groupMessage: messages };
        });
      },
      error => {
        console.log("Message fetching failed with error:", error);
      }
    );
  }

  send = () => {
    this.textMessage = new CometChat.TextMessage(
      this.state.userRecieverId,
      this.state.chat,
      this.messageType,
      this.receiverType
    );

    CometChat.sendMessage(this.textMessage).then(
      message => {
        console.log("Message sent successfully:", message);
        this.setState({ chat: null });
        this.updateMessage();
      },
      error => {
        console.log("Message sending failed with error:", error);
      }
    );
  }

  scrollToBottom() {
    const chat = document.querySelectorAll(".chat")[0];
    chat.scrollTop = chat.scrollHeight;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.send();
    e.target.reset();
  }
  handleChange = (e) => {
    this.setState({ chat: e.target.value });
  }

  sendFile = () => {
    var  mediaMessage = new CometChat.MediaMessage(
      this.state.userRecieverId,
      this.state.name,
      this.fileType,
      this.receiverType
    );


    CometChat.sendMediaMessage(mediaMessage).then(
      messages => {
        console.log("sent successfully", messages)
        this.updateMessage()
      },
      error => {
        console.log("something went wrong", error)
      }
    )
  }

  handleFile = (e) => {
    this.setState({
      name: e.target.files[0]
    },()=> console.log('iiiiiiiii', this.state.name))
  }

  // Get the current logged in user

  getUser = () => {
    CometChat.getLoggedinUser().then(
      user => {
        console.log("user details:", { user });
        this.setState({ user: user }, () => {
          return { user: user };
        });
        return { user };
      },
      error => {
        console.log("error getting details:", { error });
        return false;
      }
    );
  }

  render() {
    console.log("who get this props", this.props)
    return (
      <React.Fragment>
        <div >
          <ol className="chat">
            {this.state.groupMessage.map(data => (
              <div>
                {/* Render loggedin user chat at the right side of the page */}

                {this.state.user.uid === data.sender.uid ? (
                  <li className="self" key={data.id}>
                    <div className="msg">
                      <p>{data.sender.uid}</p>
                      {/* USING TENEARY OPERATOR TO CHECK THE MESSAGE TYPE */}
                      <div>
                        {data.type == "text" ? 
                        <div className="message"> 
                            { data.data.text}

                      </div>
                       : 
                       <img src={data.file} alt="file"/>}
                      </div>
                    </div>
                  </li>
                ) : (
                  // render loggedin users chat at the left side of the chatwindow
                  <li class="other" key={data.id}>
                    <div class="msg">
                      <p>{data.sender.uid}</p>

                      <div>
                        {data.type == "text" ? 
                        <div className="message"> 
                            { data.data.text}

                      </div>
                       : 
                       <img src={data.file} alt="file"/>}
                      </div>
                    </div>
                  </li>
                )}
              </div>
            ))}
          </ol>
          {/* check if a group has been selected */}
          {this.props.state.startChatStatus ? (
            <div className="InputWrapper">
              <form onSubmit={this.handleSubmit}>
                <input
                  className="textarea input"
                  type="text"
                  placeholder="Type a message..."
                  onChange={this.handleChange}
                />
                <input 
                type="file"
                name="img_file"
                onChange={this.handleFile}
                />
              </form>
                <button onClick={this.sendFile}> Submit</button>

              <div className="emojis" />
            </div>
          ) : (
            "Please, choose a group to start cheatting..."
          )}
        </div>
      </React.Fragment>
    );
  }
}