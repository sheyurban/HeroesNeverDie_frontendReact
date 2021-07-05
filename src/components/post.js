import React, { Component } from 'react';

import guide from '../assets/images/guidePic.jpeg';

import '../layout/css/post.css';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <p>posted by hanzomain5, one hour ago</p>
        <h2>GUIDE TO SOMETHING</h2>
        <div className="postContent">
          <img alt="content" src={guide} />
        </div>
        <div className="likescomments">
          <i className="heart fas fa-heart"></i>
          <div>208</div>
          <i className="comment fas fa-comment-alt"></i>
          <div>15</div>
        </div>
      </div>
    );
  }
}

export default Post;
