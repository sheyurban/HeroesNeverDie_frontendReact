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
    this.state = { postesLoaded: false, posts: [] };
  }

  handleLoadingOfPosts() {
    const { loadPosts } = this.props;
    loadPosts();
  }

  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts(this.props.AuthReducer.accessToken);
    console.log(this.props.PostReducer.posts);
  }

  render() {
    // this.props.posts = this.props.PostReducer.posts;
    // console.log(posts);
    return (
      <div>
        <Post />
        {/* {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))} */}
      </div>
    );
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
