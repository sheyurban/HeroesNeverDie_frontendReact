import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as postActions from '../actions/PostActions';

import '../layout/css/updateMode.css';
import { bindActionCreators } from 'redux';

import SelectGuide from './selectGuide';

const mapStateToProps = (state) => {
  return state;
};

class updateMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.PostReducer.post.title,
      content: this.props.PostReducer.post.content,
      type: this.props.PostReducer.post.tags.type,
      map: this.props.PostReducer.post.tags.map,
      hero: this.props.PostReducer.post.tags.hero,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const data = {
      id: this.props.PostReducer.post._id,
      title: this.state.title,
      content: this.state.content,
      tags: {
        map: this.state.map,
        hero: this.state.hero,
        type: this.state.type,
      },
    };
    console.log(data);

    const { updatePost } = this.props;
    await updatePost(data, this.props.AuthReducer.accessToken);
    const { getPosts } = this.props;
    getPosts(this.props.AuthReducer.accessToken, this.props.category);
  }

  handleTagsChange(tag) {
    this.setState({ [tag.tagName]: tag.value });
  }

  handleCancel() {
    const { hideUpdateMode } = this.props;
    hideUpdateMode();
  }

  render() {
    let selectElem;
    if (this.props.PostReducer.post.category === 'Guide') {
      selectElem = <SelectGuide onTagsChange={this.handleTagsChange} />;
    }
    return (
      <div className="post updateMode">
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <div id="textAreaContainer">
          <textarea
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>

        {selectElem}
        <div className="buttons">
          <button onClick={this.handleCancel}>CANCEL</button>
          <button onClick={this.handleSubmit}>DONE</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPosts: postActions.getPosts,
      showUpdateMode: postActions.showUpdateMode,
      hideUpdateMode: postActions.hideUpdateMode,
      updatePost: postActions.updatePost,
    },
    dispatch
  );

const connectedUpdateMode = connect(
  mapStateToProps,
  mapDispatchToProps
)(updateMode);
export default connectedUpdateMode;
