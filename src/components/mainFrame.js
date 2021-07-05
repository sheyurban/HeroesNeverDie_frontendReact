import React, { Component } from 'react';

import PostContainer from './postContainer';

// import GroupSearchContainer from './groupsearchContainer';
import '../layout/css/mainFrame.css';

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

export default MainFrame;
