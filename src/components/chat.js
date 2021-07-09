import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as messageActions from '../actions/MessageActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', chatUser: '' };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async reloadMessages() {
    const { getMessages } = this.props;
    await getMessages(this.props.AuthReducer.accessToken);
    let newChat = JSON.parse(this.props.MessageReducer.chats).find(
      (chat) =>
        chat[0].by.username === this.props.MessageReducer.openChat.username ||
        chat[0].to.username === this.props.MessageReducer.openChat.username
    );
    const { openChat } = this.props;
    openChat(newChat);
  }

  sendMessage() {
    if (this.state.message === '') {
      return alert('Type a message first...');
    }
    const data = { to: this.state.chatUser._id, content: this.state.message };
    const { sendMessage } = this.props;
    sendMessage(data, this.props.AuthReducer.accessToken);
    this.setState({ message: '' });
    this.reloadMessages();
  }

  componentDidMount() {
    let chatUser;
    let chatUser1 = this.props.MessageReducer.chat[0].to;
    let chatUser2 = this.props.MessageReducer.chat[0].by;
    if (chatUser1.username !== this.props.AuthReducer.user.username)
      chatUser = chatUser1;
    else chatUser = chatUser2;
    this.setState({ chatUser: chatUser });
    const { setChatUser } = this.props;
    setChatUser(chatUser);
  }

  closeChat() {
    const { closeChat } = this.props;
    closeChat();
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

  renderMessages(chats) {
    return chats.map((chat) => (
      <div
        className={
          chat.by.username === this.props.AuthReducer.user.username
            ? 'myMessage'
            : 'yourMessage'
        }
      >
        {chat.content}
        <p className="timeStamp">{this.parseTime(chat.createdAt)}</p>
      </div>
    ));
  }
  render() {
    return (
      <div id="chat">
        <button className="labelAlignLeft" onClick={this.closeChat}>
          {'<<<'}
        </button>
        <h2>{this.state.chatUser.username}</h2>
        <div id="chatMessages">
          {this.renderMessages(this.props.MessageReducer.chat)}
        </div>
        <div id="chatMenu">
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          ></input>
          <button onClick={this.sendMessage}>send</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendMessage: messageActions.sendMessage,
      closeChat: messageActions.closeChat,
      setChatUser: messageActions.setChatUser,
      getMessages: messageActions.getMessages,
      openChat: messageActions.openChat,
    },
    dispatch
  );

const connectedChat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default connectedChat;
