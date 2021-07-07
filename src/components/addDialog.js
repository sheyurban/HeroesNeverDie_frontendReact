import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/addDialog.css';

import * as postActions from '../actions/PostActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class AddDialog extends Component {
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
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const { title, content, file, type, hero, map } = this.state;
    const data = {
      title,
      category: 'Guide',
      tags: [{ type: type }, { hero: hero }, { map }],
      content,
      file,
    };
    console.log(data);
    // const { authenticateUserAction } = this.props;
    // authenticateUserAction(username, password);
  }

  render() {
    var showDialog = this.props.PostReducer.showAddDialog;
    if (showDialog === undefined) showDialog = false;

    const optionsHero = [
      'Ana',
      'Mercy',
      'Hanzo',
      'Bastion',
      'Widow',
      'Genji',
      'Dva',
    ];
    const optionsMap = ['Dorado', 'Havana', 'Paris', 'Schwarzenwalde'];
    const optionsType = [
      'Heroguide',
      'Mapguide',
      'Ultimates',
      'Unranked to GM',
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
              <label for="title" id="contentLabel">
                Title:
              </label>
            </div>
            <input type="text" name="title" onChange={this.handleChange} />
            <div className="labelAlignLeft">
              <label for="content" id="contentLabel">
                Content:
              </label>
            </div>
            <textarea
              id="content"
              type="text"
              name="content"
              onChange={this.handleChange}
            ></textarea>
            <div className="labelAlignLeft">
              <input
                type="file"
                accept="image/*"
                name="sampleFile"
                onChange={this.handleChange}
              />
            </div>

            <div id="selectorDiv">
              <div>
                <label for="type">Type:</label>
                <select name="type" id="type" onChange={this.handleChange}>
                  {optionsType.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                  <option value="" selected>
                    select
                  </option>
                </select>
              </div>
              <div>
                <label for="hero">Hero:</label>
                <select name="hero" id="hero" onChange={this.handleChange}>
                  {optionsHero.map((option) => (
                    <option value={option}>{option}</option>
                  ))}

                  <option value="" selected>
                    select
                  </option>
                </select>
              </div>
              <div>
                <label for="map">Map:</label>
                <select name="map" id="map" onChange={this.handleChange}>
                  {optionsMap.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                  <option value="" selected>
                    select
                  </option>
                </select>
              </div>
            </div>
            <button id="registerButton">DISCARD</button>
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
      addGuide: postActions.addGuide,
    },
    dispatch
  );

const connectedAddDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDialog);

export default connectedAddDialog;
