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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async addLike() {
    const { addLikeAction } = this.props;
    await addLikeAction(
      this.props.post._id,
      this.props.AuthReducer.accessToken
    );
    console.log(this.props.category)
    const { getPosts } = this.props;
    getPosts(this.props.AuthReducer.accessToken, this.props.category);
  }

  async handleDelete() {
    const data = { id: this.props.post._id };
    const { deletePost } = this.props;
    await deletePost(data, this.props.AuthReducer.accessToken);
    const { getPosts } = this.props;
    getPosts(this.props.AuthReducer.accessToken, this.props.category);
  }

  handleUpdate() {
    console.log('update');
    const { showUpdateMode } = this.props;
    showUpdateMode(this.props.post);
    // switch (this.props.category) {
    //   case 'guide':

    //     break;

    //   default:
    //     break;
    // }
  }

  showTime(timestamp) {
    var dateNow = new Date().getTime();
    var datePost = new Date(timestamp);
    var timePassed = new Date(dateNow - datePost);
    var hours = timePassed.getHours() - 1;
    var minutes = timePassed.getMinutes();

    var millisecondsPerDay = 86400000;

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    switch (true) {
      case timePassed.getTime() >= millisecondsPerDay:
        return datePost.toLocaleDateString('de-DE', options);
      case hours === 1:
        return hours + ' hour ago';
      case hours > 1:
        return hours + ' hours ago';
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
    if (
      this.props.post.username === this.props.user.username ||
      this.props.user.isAdmin
    )
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
            <i className="fas fa-pen" onClick={this.handleUpdate}></i>
            <i className="fas fa-trash" onClick={this.handleDelete}></i>
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
      getPosts: postActions.getPosts,
      deletePost: postActions.deletePost,
      showUpdateMode: postActions.showUpdateMode,
      hideUpdateMode: postActions.hideUpdateMode,
    },
    dispatch
  );

const connectedPost = connect(mapStateToProps, mapDispatchToProps)(Post);
export default connectedPost;
