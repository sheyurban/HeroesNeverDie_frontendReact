import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/messages.css';
import { bindActionCreators } from 'redux';
import * as messageActions from '../actions/MessageActions';

const mapStateToProps = (state) => {
  return state;
};

class ChatPreview extends Component {
  constructor(props) {
    super(props);
    this.state = { chatUser: '' };

    this.goToChat = this.goToChat.bind(this);
  }

  goToChat() {
    const { openChat } = this.props;
    openChat(this.props.chat);
  }

  componentDidMount() {
    let chatUser;
    let chatUser1 = this.props.chat[0].to;
    let chatUser2 = this.props.chat[0].by;
    if (chatUser1.username !== this.props.AuthReducer.user.username)
      chatUser = chatUser1;
    else chatUser = chatUser2;
    this.setState({ chatUser: chatUser });
  }

  parseTime(timestamp) {
    var dateNow = new Date().getTime();
    var datePost = new Date(timestamp);
    var timePassed = new Date(dateNow - datePost);
    var hours = datePost.getHours();
    var minutes = datePost.getMinutes();

    var millisecondsPerDay = 86400000;

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    switch (true) {
      case timePassed.getTime() >= millisecondsPerDay:
        return datePost.toLocaleDateString('de-DE', options);

      default:
        return (
          (hours < 10 ? '0' : '') +
          hours +
          ':' +
          (minutes < 10 ? '0' : '') +
          minutes
        );
    }
  }
  render() {
    let chat = this.props.chat;
    let lastMessage = this.props.chat.length - 1;

    return (
      <div className="messagePreview" onClick={this.goToChat}>
        <span>{this.state.chatUser.username}</span>
        <span>{chat[lastMessage].content}</span>
        <span>{this.parseTime(chat[lastMessage].createdAt)}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openChat: messageActions.openChat,
    },
    dispatch
  );

const connectedChatPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPreview);

export default connectedChatPreview;
