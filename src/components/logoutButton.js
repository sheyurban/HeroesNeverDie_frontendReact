import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/modalLogin.css';

import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return state;
};

class LogoutButton extends Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log('LOGOUT');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>LOGOUT</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
