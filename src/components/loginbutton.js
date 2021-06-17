import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/modalLogin.css';

import * as authenticationActions from '../actions/AuthenticationActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShow(e) {
    e.preventDefault();
    const { showLoginDialogAction } = this.props;
    showLoginDialogAction();
  }

  handleClose() {
    const { hideLoginDialogAction } = this.props;
    hideLoginDialogAction();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { authenticateUserAction } = this.props;
    authenticateUserAction(username, password);
  }

  render() {
    var showDialog = this.props.showLoginDialog;
    if (showDialog === undefined) showDialog = false;

    return (
      <div>
        <button onClick={this.handleShow}>LOGIN</button>
        <div
          show="showDialog"
          id="blurredBackground"
          className={showDialog ? '' : 'modalLoginHide'}
          onClick={this.handleClose}
        ></div>
        <div
          id="modalLogin"
          className={showDialog ? '' : 'modalLoginHide'}
          onClick={this.handleShow}
        >
          <form>
            <div>
              <h2>LOGIN</h2>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              <button id="registerButton">REGISTER</button>
              <button type="submit" onClick={this.handleSubmit}>
                LOGIN
              </button>
              <p>LOGIN ISSUES?</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
      hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
      authenticateUserAction: authenticationActions.authenticateUser,
    },
    dispatch
  );

const connectedLoginButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
export default connectedLoginButton;
