import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

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
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeSelect(tag) {
    this.setState({ [tag.tagName]: tag.value });
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
      category: 'Guide',
      tags: { type: type, hero: hero, map },
      content,
      file,
    };
    const { addPost } = this.props;
    await addPost(data, this.props.AuthReducer.accessToken);
    const { getPosts } = this.props;
    getPosts(this.props.AuthReducer.accessToken, 'guide');
    this.reset();
  }

  render() {
    var showDialog = this.props.PostReducer.showAddDialog;
    if (showDialog === undefined) showDialog = false;

    const optionsHero = [
      { value: 'Ana', label: 'Ana', tagName: 'hero' },
      { value: 'Mercy', label: 'Mercy', tagName: 'hero' },
      { value: 'Hanzo', label: 'Hanzo', tagName: 'hero' },
      { value: 'Bastion', label: 'Bastion', tagName: 'hero' },
      { value: 'Widow', label: 'Widow', tagName: 'hero' },
      { value: 'Genji', label: 'Genji', tagName: 'hero' },
      { value: 'Dva', label: 'Dva', tagName: 'hero' },
    ];
    const optionsMap = [
      { value: 'Havana', label: 'Havana', tagName: 'map' },
      { value: 'Dorado', label: 'Dorado', tagName: 'map' },
      { value: 'Paris', label: 'Paris', tagName: 'map' },
      { value: 'Schwarzenwalde', label: 'Schwarzenwalde', tagName: 'map' },
      { value: 'Route66', label: 'Route66', tagName: 'map' },
    ];
    const optionsType = [
      { value: 'Heroguide', label: 'Heroguide', tagName: 'type' },
      { value: 'Mapguide', label: 'Mapguide', tagName: 'type' },
      { value: 'Ultimates', label: 'Ultimates', tagName: 'type' },
      { value: 'Unranked to GM', label: 'Unranked to GM', tagName: 'type' },
    ];

    return (
      <div
        id="addDialog"
        className={showDialog ? '' : 'modalLoginHide'}
        onClick={this.handleShow}
      >
        <form>
          <div>
            <h2>NEW GUIDE</h2>
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
              value={this.state.content}
              id="content"
              type="text"
              name="content"
              onChange={this.handleChange}
            ></textarea>
            {/* <div className="labelAlignLeft">
              <input
                type="file"
                accept="image/*"
                name="sampleFile"
                onChange={this.handleChange}
              />
            </div> */}

            <div id="selectorDiv">
              <div>
                <label htmlFor="type">Type:</label>
                <Select
                  className="selectReact"
                  options={optionsType}
                  value={optionsType.value}
                  onChange={this.handleChangeSelect}
                />
              </div>
              <div>
                <label htmlFor="hero">Hero:</label>
                <Select
                  className="selectReact"
                  options={optionsHero}
                  value={optionsHero.value}
                  onChange={this.handleChangeSelect}
                />
              </div>
              <div>
                <label htmlFor="map">Map:</label>
                <Select
                  className="selectReact"
                  options={optionsMap}
                  value={optionsMap.value}
                  onChange={this.handleChangeSelect}
                />
              </div>
            </div>
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
