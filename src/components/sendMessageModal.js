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
    this.state = { username: '', password: '', email: '' };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterToggle = this.handleRegisterToggle.bind(this);
    this.handleLoginModal = this.handleLoginModal.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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

  handleRegisterToggle() {
    const { getRegisterModal } = this.props;
    getRegisterModal();
  }

  handleLoginModal(e) {
    e.preventDefault();
    const { getLoginModal } = this.props;
    getLoginModal();
  }

  handleRegister(e) {
    e.preventDefault();
    const { username, password, email } = this.state;
    const { getRegisterAction } = this.props;
    getRegisterAction(username, password, email);
  }

  render() {
    var showDialog = this.props.AuthReducer.showLoginDialog;
    if (showDialog === undefined) showDialog = false;

    return (
      <div>
        <button onClick={this.handleShow}>LOGIN</button>
        <div
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
              <h2>Send message</h2>
              <input
                type="text"
                placeholder="Message"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
              />

              <button type="submit" onClick={this.handleSubmit}>
                
              </button>
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
      getRegisterModal: authenticationActions.getRegisterModal,
      getLoginModal: authenticationActions.getLoginModal,
      getRegisterAction: authenticationActions.registerUser,
    },
    dispatch
  );

const connectedLoginButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
export default connectedLoginButton;
