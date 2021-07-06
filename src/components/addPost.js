import React, { Component } from 'react';

import '../layout/css/addPost.css';

class addPost extends Component {
  
  
  render() {
   

    return (
      <div className="addPost">
        <p>
          posted by {this.props.post.username},{' '}
          {this.showTime(this.props.post.createdAt)}
        </p>
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

export default addPost;
