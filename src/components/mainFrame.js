import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupSearchContainer from './groupsearchContainer';
import '../layout/css/mainFrame.css';
import PostContainer from './postContainer';
import GuideContainer from './guideContainer';

import * as tabActions from '../actions/TabActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.handleTabSwitch = this.handleTabSwitch.bind(this);
  }

  handleTabSwitch(e) {
    console.log(this.props.TabReducer.activeTab);
    console.log(e.target.id);
    const { switchTab } = this.props;
    switchTab(e.target.id);
  }

  render() {
    console.log(this.props);
    console.log(tabActions);

    let activeFeed;
    switch (this.props.TabReducer.activeTab) {
      case 'home':
        activeFeed = <PostContainer />;
        break;
      case 'group':
        activeFeed = <GroupSearchContainer />;
        break;
      case 'guide':
        activeFeed = <GuideContainer />;
        break;
      default:
        activeFeed = <PostContainer />;
    }

    return (
      <div id="MainFrame">
        <div
          onClick={this.handleTabSwitch}
          id="home"
          className={this.props.TabReducer.activeTab === 'home' ? 'active' : ''}
        >
          HOME
        </div>
        <div
          onClick={this.handleTabSwitch}
          id="group"
          className={
            this.props.TabReducer.activeTab === 'group' ? 'active' : ''
          }
        >
          GROUP SEARCH
        </div>
        <div
          onClick={this.handleTabSwitch}
          id="guide"
          className={
            this.props.TabReducer.activeTab === 'guide' ? 'active' : ''
          }
        >
          GUIDES
        </div>
        <div
          onClick={this.handleTabSwitch}
          id="discuss"
          className={
            this.props.TabReducer.activeTab === 'discuss' ? 'active' : ''
          }
        >
          DISCUSS
        </div>
        <div id="feedDiv">{activeFeed}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      switchTab: tabActions.switchTab,
    },
    dispatch
  );

const connectedMainFrame = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainFrame);
export default connectedMainFrame;
