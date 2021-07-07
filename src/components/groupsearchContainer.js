import React, { Component } from 'react';

import gold from '../assets/images/gold.png';

import '../layout/css/groupsearch.css';

class GroupSearchContainer extends Component {
  render() {
    return (
      <div className="groupSearchContainer">
        {/* <div className="filters">
          <div>MODE:</div>
          <div>REGION:</div>
          <div>LANGUAGE:</div>
          <div>RANK:</div>
        </div> */}
        <div className="buttonDiv">
          <button>+</button>
        </div>
        <div className="tableGS">
          <div className="header">
            <span>TITLE</span>
            <span>PLAYER</span>
            <span>MODE</span>
            <span>REGION</span>
            <span>RANK</span>
          </div>

          <div className="entry">
            <span>
              Ranked role queue, looking for team to play regularly in spane
              evening
            </span>
            <span>HIDENSEEK</span>
            <span>Competitive RQ</span>
            <span>EU</span>
            <span className="rank">
              <img alt="" src={gold} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupSearchContainer;
