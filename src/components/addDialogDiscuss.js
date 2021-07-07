import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/addDialog.css';

import * as postActions from '../actions/PostActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class AddDialogGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      file: null,
      type: '',
      hero: '',
      map: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  reset() {
    const initialState = {
      title: '',
      content: '',
      file: null,
      type: '',
      hero: '',
      map: '',
    };
    this.setState(initialState);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { title, content, file, type, hero, map } = this.state;
    const data = {
      title,
      category: 'Discuss',
      tags: { type: type, hero: hero, map },
      content,
      file,
    };
    const { addPost } = this.props;
    await addPost(data, this.props.AuthReducer.accessToken);
    const { getPosts } = this.props;
    getPosts(this.props.AuthReducer.accessToken, 'discuss');
    this.reset();
  }

  render() {
    var showDialog = this.props.PostReducer.showAddDialog;
    if (showDialog === undefined) showDialog = false;

    return (
      <div
        id="addDialog"
        className={showDialog ? '' : 'modalLoginHide'}
        onClick={this.handleShow}
      >
        <form>
          <div>
            <h2>NEW DISCUSSION TOPIC</h2>
            <div className="labelAlignLeft">
              <label htmlFor="title" id="contentLabel">
                Title:
              </label>
            </div>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <div className="labelAlignLeft">
              <label htmlFor="content" id="contentLabel">
                Content:
              </label>
            </div>
            <textarea
              id="content"
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            ></textarea>

            {/* <button>DISCARD</button> */}
            <button type="submit" onClick={this.handleSubmit}>
              POST
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPost: postActions.addPost,
      getPosts: postActions.getPosts,
    },
    dispatch
  );

const connectedAddDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDialogGuide);

export default connectedAddDialog;
