import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../layout/css/profilFrame.css';

import * as tabActions from '../actions/TabActions';
import { bindActionCreators } from 'redux';

import UserOverview from './userOverview';
import MessageContainer from './messageContainer';
import Profil from './profil';


const mapStateToProps = (state) => {
  return state;
};

class ProfilFrame extends Component {
  constructor(props) {
    super(props);
    this.handleTabSwitch = this.handleTabSwitch.bind(this);
  }

  handleTabSwitch(e) {
    const { switchTab } = this.props;
    switchTab(e.target.id);
  }

  render() {
    let userTab;
    if (this.props.AuthReducer.user.isAdmin)
      userTab = (
        <div
          id="useroverview"
          onClick={this.handleTabSwitch}
          className={
            this.props.TabReducer.activeTab === 'useroverview' ? 'active' : ''
          }
        >
          USERS
        </div>
      );
    else userTab = <div id="divEmpty2"></div>;

    let activeFeed;
    switch (this.props.TabReducer.activeTab) {
      case 'profil':
        activeFeed = <Profil />;
        break;
      case 'messages':
        activeFeed = <MessageContainer />;
        break;
      case 'useroverview':
        activeFeed = <UserOverview />;
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
        {userTab}
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
