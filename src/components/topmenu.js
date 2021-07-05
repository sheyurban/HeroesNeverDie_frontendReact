import React, { Component } from 'react';

import '../layout/css/topmenu.css';
import logo from '../assets/images/logo.png';
import LoginButton from '../components/loginbutton';
import LogoutButton from './logoutButton';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

class TopMenu extends Component {
  render() {
    const user = this.props.AuthReducer.user;
    let button;
    if (user) button = <LogoutButton />;
    else button = <LoginButton />;
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
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopMenu);
