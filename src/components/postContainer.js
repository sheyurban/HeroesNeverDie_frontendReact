import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './post';

import * as postActions from '../actions/PostActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postesLoaded: false,
      posts: this.props.loadPosts(this.props.AuthReducer.accessToken),
    };
  }

  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts(this.props.AuthReducer.accessToken);
  }

  renderPosts(posts, user) {
    return posts
      .reverse()
      .map((post) => <Post key={post.id} post={post} user={user} />);
  }

  render() {
    let posts = [];
    posts = this.props.PostReducer.posts;
    let postComp;
    if (posts === undefined || posts.length < 1) postComp = 'LOADING';
    else
      postComp = this.renderPosts(
        JSON.parse(posts),
        this.props.AuthReducer.user
      );
    return <div>{postComp}</div>;
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadPosts: postActions.getPosts,
    },
    dispatch
  );

const connectedPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
export default connectedPostsContainer;
