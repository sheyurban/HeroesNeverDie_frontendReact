import React, { Component } from 'react';

import '../layout/css/topmenu.css';
import logo from '../assets/images/logo.png';
import LoginButton from '../components/loginbutton';

class TopMenu extends Component {
  render() {
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
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default TopMenu;
