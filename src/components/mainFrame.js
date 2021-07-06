import React, { Component } from 'react';
import { connect } from 'react-redux';

// import GroupSearchContainer from './groupsearchContainer';
import '../layout/css/mainFrame.css';
import PostContainer from './postContainer';

const mapStateToProps = (state) => {
  return state;
};

class MainFrame extends Component {
  render() {
    return (
      <div id="MainFrame">
        <div id="homeTab" className="active">
          HOME
        </div>
        <div id="groupTab">GROUP SEARCH</div>
        <div id="guideTab">GUIDES</div>
        <div id="discussTab">DISCUSS</div>
        <div id="feedDiv">
          {/* <GroupSearchContainer /> */}
          <PostContainer />
        </div>
      </div>
    );
  }
}

const connectedMainFrame = connect(mapStateToProps)(MainFrame);

export default connectedMainFrame;
