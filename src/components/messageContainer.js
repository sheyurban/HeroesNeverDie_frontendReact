import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../layout/css/messages.css';

import ChatPreview from './chatPreview';
import Chat from './chat';

import * as messageActions from '../actions/MessageActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class MessageContainer extends Component {
  componentDidMount() {
    const { getMessages } = this.props;
    getMessages(this.props.AuthReducer.accessToken);
  }

  renderMessages(chats) {
    return chats.reverse().map((chat) => <ChatPreview chat={chat} />);
  }

  render() {
    let chats = [];
    chats = this.props.MessageReducer.chats;
    let chatComp;
    if (chats === undefined || chats.length < 1 || chats === '[]')
      return (chatComp = <div className="emptyChat">No chats available</div>);
    else if (this.props.MessageReducer.showSingleChat) {
      chatComp = <Chat />;
    } else chatComp = this.renderMessages(JSON.parse(chats));

    return <div id="messageContainer">{chatComp}</div>;
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMessages: messageActions.getMessages,
    },
    dispatch
  );

const connectedMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);

export default connectedMessageContainer;
