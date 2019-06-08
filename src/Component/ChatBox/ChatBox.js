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
    this.LISTENER_KEY_MESSAGE = "msglistener";
  }


  componentDidUpdate() {
    this.updateUser = this.state.userRecieverId;
    if (this.updateUser !== this.props.state.group) {
      this.setState({ userRecieverId: this.props.state.group }, () => {
        this.updateMessage();
        
        this.getChat();
        
        return { userRecieverId: this.props.state.group };
      });
    } else {
    }
    this.scrollToBottom();
  }
  

  
  componentDidMount() {
    this.getUser();
  }
  
  updateMessage = () => {
    this.messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(this.props.state.group)
    .setLimit(this.limit)
    .build();
    
    
    this.messagesRequest.fetchPrevious().then(
      messages => {
        this.setState({ groupMessage: [] }, () => {
          return { groupMessage: [] };
        });
        this.setState({ groupMessage: messages }, () => {
          return { groupMessage: messages };
        });
      },
      error => {
        return error
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
        this.setState({ chat: null });
        this.updateMessage();
        return message
      },
      error => {
        return error
      }
    );

    }



  getChat = () => {
    CometChat.addMessageListener(
      this.LISTENER_KEY_MESSAGE,
       new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          this.setState(
            prevState => ({
              groupMessage: [...prevState.groupMessage, textMessage]
            }))
        },
        onMediaMessageReceived: mediaMessage => {

          this.setState(
            prevState => ({
              groupMessage: [...prevState.groupMessage, mediaMessage]
            }))
          console.log("Media message received successfully", mediaMessage);
          // Handle media message
        },
      })
    )

  }

  


  scrollToBottom = () => {
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
    var mediaMessage = new CometChat.MediaMessage(
      this.state.userRecieverId,
      this.state.name,
      this.fileType,
      this.receiverType
    );


    CometChat.sendMediaMessage(mediaMessage).then(
      messages => {
        this.updateMessage()
        return messages
      },
      error => {
        return error
      }
    )
  }

  handleFile = (e) => {
    this.setState({
      name: e.target.files[0]
    })
  }

  // Get the current logged in user

  getUser = () => {
    CometChat.getLoggedinUser().then(
      user => {
        this.setState({ user: user }, () => {
          return { user: user };
        });
        return { user };
      },
      error => {
        return error;
      }
    );
  }

  render() {
    
    return (
      <React.Fragment>
        <div>
          <ol className="chat">
            {this.state.groupMessage.map(data => (
              <div key={data.id}>

                {this.state.user.uid === data.sender.uid ? (
                  <li className="self" key={data.id}>
                    <div className="msg">
                      <p>{data.sender.uid}</p>
                      <div>
                        {data.type === "text" ?
                          <div className="message">
                            {data.data.text}

                          </div>
                          :
                          <img src={data.file} alt="file" />}
                      </div>
                    </div>
                  </li>
                ) : (
                    <li className="other" key={data.id}>
                      <div className="msg">
                        <p>{data.sender.uid}</p>

                        <div>
                          {data.type === "text" ?
                            <div className="message">
                              {data.data.text}

                            </div>
                            :
                            <img src={data.file} alt="file" />}
                        </div>
                      </div>
                    </li>
                  )}
              </div>
            ))}
          </ol>
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