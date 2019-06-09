import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";
import "./index.css";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.limit = 30;

    this.state = {
      groupList: [],
      activeGroup: "",
      currentClicked: 0,
    };
  }

  componentDidMount() {
    this.groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(this.limit)
      .build();

    this.groupsRequest.fetchNext().then(
      groupList => {
        this.setState({ groupList });
      },
      error => {
        return error
      }
    );
  }

  selectGroup(GUID, key) {
    this.password = "";
    this.groupType = CometChat.GROUP_TYPE.PUBLIC;
    this.props.updateState(GUID);
    CometChat.joinGroup(GUID, this.groupType, this.password).then(
      group => {
        return group
      },
      error => {
        return error
      }
    );

    this.setState({
      currentClicked: key
    })
  }


  render() {
    let { currentClicked } = this.state
    return (
      <React.Fragment>
        <div >
          <ul>
            {this.state.groupList.map((groups, key) => (
              <li
                key={groups.guid}
                onClick={this.selectGroup.bind(this, groups.guid, key)}
                className={`${currentClicked === key ? 'active' : ''}`}
              >
                <div className="groupName">{groups.name}</div>
              </li>
            ))}
          </ul>
          <div className="createGroup">
            <button className="createGroupBtn button">
              <Link className="a" to="/creategroup">
                Create Group
              </Link>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}