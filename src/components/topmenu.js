import React, { Component } from 'react';

import '../layout/css/topmenu.css';
import logo from '../assets/images/logo.png';
import logoSmall from '../assets/images/HND_small_logo.png';
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
    this.toggleHomeArea = this.toggleHomeArea.bind(this);
  }
  toggleProfileArea() {
    const { showProfilArea } = this.props;
    showProfilArea();
  }

  toggleHomeArea() {
    const { hideProfilArea } = this.props;
    hideProfilArea();
  }

  render() {
    const user = this.props.AuthReducer.user;
    let button, userIcon;
    if (user) {
      button = <LogoutButton />;
      userIcon = (
        <i className="fas fa-user hiddenMediaQuery" onClick={this.toggleProfileArea}></i>
      );
      if (this.props.TabReducer.showProfilArea)
        userIcon = (
          <i
            className="hiddenMediaQuery fas fa-home"
            onClick={this.toggleHomeArea}
          ></i>
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

          <div id="logo_small">
            <img src={logoSmall} alt="logo"></img>
          </div>

          <h3 className="hiddenMediaQuery">ABOUT US</h3>
          <h3 className="hiddenMediaQuery">FEATURES</h3>
          <h3 className="hiddenMediaQuery">FAQ</h3>
          <h3 className="hiddenMediaQuery">CONTACT</h3>

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
      hideProfilArea: tabActions.hideProfilArea,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
