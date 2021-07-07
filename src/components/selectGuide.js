import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import '../layout/css/addDialog.css';

const mapStateToProps = (state) => {
  return state;
};

class selectGuide extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTagsChange(e);
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

    let currentType = this.props.PostReducer.post.tags.type;
    let indexType = optionsType.findIndex((e) => e.value === currentType);
    let currentMap = this.props.PostReducer.post.tags.map;
    let indexMap = optionsMap.findIndex((e) => e.value === currentMap);
    let currentHero = this.props.PostReducer.post.tags.hero;
    let indexHero = optionsHero.findIndex((e) => e.value === currentHero);

    return (
      <div id="selectorDiv">
        <div>
          <label htmlFor="type">Type:</label>
          <Select
            className="selectReact"
            options={optionsType}
            value={optionsType.value}
            defaultValue={optionsType[indexType]}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="hero">Hero:</label>
          <Select
            className="selectReact"
            options={optionsHero}
            value={optionsHero.value}
            defaultValue={optionsHero[indexHero]}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="map">Map:</label>
          <Select
            className="selectReact"
            options={optionsMap}
            value={optionsMap.value}
            defaultValue={optionsMap[indexMap]}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const connectedSelectGuide = connect(mapStateToProps)(selectGuide);

export default connectedSelectGuide;
