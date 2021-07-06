import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as postActions from '../actions/PostActions';

import '../layout/css/post.css';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.addLike = this.addLike.bind(this);
  }

  addLike(props) {
    const { addLikeAction } = this.props;
    addLikeAction(this.props.post._id, this.props.AuthReducer.accessToken);
  }

  showTime(timestamp) {
    var dateNow = new Date().getTime();
    var datePost = new Date(timestamp);
    var timePassed = new Date(dateNow - datePost);
    var hours = timePassed.getHours() - 1;
    var minutes = timePassed.getMinutes();

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    switch (true) {
      case hours < 1:
        return minutes + ' minutes ago';
      case hours === 1:
        return hours + ' hour ago';
      case hours > 1:
        return hours + ' hours ago';
      case hours > 23:
        return datePost.toLocaleDateString('de-DE', options);
      case minutes <= 1:
        return '1 minute ago';
      default:
        return datePost.toLocaleDateString('de-DE', options);
    }
  }
  render() {
    let heartIcon;
    if (this.props.post.likes.includes(this.props.user.id))
      heartIcon = <i className="heart fas fa-heart red" />;
    else
      heartIcon = <i onClick={this.addLike} className="heart fas fa-heart" />;

    return (
      <div className="post" key={this.props.post._id}>
        <div className="headerPost">
          posted by {this.props.post.username}
          {', '}
          {this.showTime(this.props.post.createdAt)}
          <p>
            <i className="fas fa-tag"></i>
            {this.props.post.category}
          </p>
        </div>
        <h2>{this.props.post.title}</h2>
        <div className="postContent">{this.props.post.content}</div>
        <div className="likescomments">
          {heartIcon}
          <div>{this.props.post.likes.length}</div>
          <i className="comment fas fa-comment-alt" />
          <div>{this.props.post.comments.length}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLikeAction: postActions.addLike,
    },
    dispatch
  );

const connectedPost = connect(mapStateToProps, mapDispatchToProps)(Post);
export default connectedPost;
