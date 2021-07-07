import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/modalLogin.css';

import * as authActions from '../actions/AuthenticationActions';

import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('LOGOUT');
    const { logout } = this.props;
    logout();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>LOGOUT</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logout: authActions.logOutUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
