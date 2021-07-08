import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/modalLogin.css';

import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class Profil extends Component {
  render() {
    return (
      <div>
        <div>Username: {this.props.AuthReducer.user.username}</div>
        <div>E-Mail: {this.props.AuthReducer.user.email}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
