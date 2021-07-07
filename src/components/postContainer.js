import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './post';

import * as postActions from '../actions/PostActions';
import { bindActionCreators } from 'redux';

import UpdateMode from './updateMode';

const mapStateToProps = (state) => {
  return state;
};

class PostContainer extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts(this.props.AuthReducer.accessToken, this.props.category);
  }

  renderPosts(posts, user) {
    return posts
      .reverse()
      .map((post) => (
        <Post category={this.props.category} post={post} user={user} />
      ));
  }

  render() {
    let posts = [];
    posts = this.props.PostReducer.posts;
    let postComp;
    if (this.props.PostReducer.updateMode) {
      postComp = <UpdateMode />;
    } else if (posts === undefined || posts.length < 1) postComp = 'LOADING';
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
      getPosts: postActions.getPosts,
    },
    dispatch
  );

const connectedPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
export default connectedPostsContainer;
