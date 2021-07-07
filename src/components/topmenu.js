import React, { Component } from 'react';

import '../layout/css/topmenu.css';
import logo from '../assets/images/logo.png';
import LoginButton from '../components/loginbutton';
import LogoutButton from './logoutButton';
import { connect } from 'react-redux';

import * as tabActions from '../actions/TabActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleProfileArea = this.toggleProfileArea.bind(this);
  }
  toggleProfileArea() {
    console.log('profile area');
    const { showProfilArea } = this.props;
    showProfilArea();
  }

  render() {
    const user = this.props.AuthReducer.user;
    let button, userIcon;
    if (user) {
      button = <LogoutButton />;
      userIcon = (
        <i className="fas fa-user" onClick={this.toggleProfileArea}></i>
      );
    } else {
      button = <LoginButton />;
    }

    return (
      <div id="header-wrapper">
        <div id="topmenu">
          <div id="logo">
            <img src={logo} alt="logo"></img>
          </div>

          <h3>ABOUT US</h3>
          <h3>FEATURES</h3>
          <h3>FAQ</h3>
          <h3>CONTACT</h3>

          {button}
          {userIcon}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showProfilArea: tabActions.showProfilArea,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
