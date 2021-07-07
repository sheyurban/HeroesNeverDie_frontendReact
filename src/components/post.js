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

  async addLike() {
    const { addLikeAction } = this.props;
    await addLikeAction(
      this.props.post._id,
      this.props.AuthReducer.accessToken
    );
    const { loadPosts } = this.props;
    loadPosts(this.props.AuthReducer.accessToken);
  }

  componentDidUpdate() {}

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
      case hours === 1:
        return hours + ' hour ago';
      case hours > 1:
        return hours + ' hours ago';
      case hours > 23:
        return datePost.toLocaleDateString('de-DE', options);
      case minutes <= 1 || minutes === 0:
        return '1 minute ago';
      case hours < 1:
        return minutes + ' minutes ago';
      default:
        return datePost.toLocaleDateString('de-DE', options);
    }
  }
  render() {
    let userIsAuthor;
    if (this.props.post.username === this.props.user.username)
      userIsAuthor = true;
    else userIsAuthor = false;

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
          <div className="likeButtonDiv">
            {heartIcon}
            <div>{this.props.post.likes.length}</div>
            <i className="comment fas fa-comment-alt" />
            <div>{this.props.post.comments.length}</div>
          </div>
          <div
            className={
              userIsAuthor ? 'editButtons' : ' editButtons hiddenElement'
            }
          >
            <i className="fas fa-pen"></i>
            <i className="fas fa-trash"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLikeAction: postActions.addLike,
      loadPosts: postActions.getPosts,
    },
    dispatch
  );

const connectedPost = connect(mapStateToProps, mapDispatchToProps)(Post);
export default connectedPost;
