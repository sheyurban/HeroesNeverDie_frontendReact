import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../layout/css/profilFrame.css';

import * as tabActions from '../actions/TabActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class ProfilFrame extends Component {
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
      case 'profil':
        // activeFeed = <PostContainer />;
        break;
      case 'messages':
        // activeFeed = <GroupSearchContainer />;
        break;
      default:
      // activeFeed = <PostContainer />;
    }

    return (
      <div id="profilframe">
        <div
          onClick={this.handleTabSwitch}
          id="profil"
          className={
            this.props.TabReducer.activeTab === 'profil' ? 'active' : ''
          }
        >
          PROFIL
        </div>
        <div
          onClick={this.handleTabSwitch}
          id="messages"
          className={
            this.props.TabReducer.activeTab === 'messages' ? 'active' : ''
          }
        >
          MESSAGES
        </div>
        <div id="divEmpty1"></div>
        <div id="divEmpty1"></div>
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

const connectedProfileMainFrame = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilFrame);
export default connectedProfileMainFrame;
