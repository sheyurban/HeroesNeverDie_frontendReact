import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../layout/css/userOverview.css';

import { bindActionCreators } from 'redux';
import * as authActions from '../actions/AuthenticationActions';

const mapStateToProps = (state) => {
  return state;
};

class UserOverview extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.makeUserAdmin = this.makeUserAdmin.bind(this);
  }

  async deleteUser(e) {
    const id = { id: e.target.getAttribute('id') };
    const { deleteUser } = this.props;
    await deleteUser(id, this.props.AuthReducer.accessToken);
    const { getUsers } = this.props;
    getUsers(this.props.AuthReducer.accessToken);
  }

  errorMessage() {
  }

  async makeUserAdmin() {
    const { makeAdmin } = this.props;
    await makeAdmin(
      { id: this.props.user.id },
      this.props.AuthReducer.accessToken
    );
    const { getUsers } = this.props;
    getUsers(this.props.AuthReducer.accessToken);
  }

  render() {
    return (
      <div id="userRow" className="userOverview">
        <div className="entry">
          <span>{this.props.user.username}</span>
          <span>{this.props.user.email}</span>
          <span>{this.props.user.isAdmin.toString()}</span>
          <span>
            <button
              className={
                this.props.user.username ===
                this.props.AuthReducer.user.username
                  ? 'greyButton'
                  : ''
              }
              id={this.props.user.id}
              onClick={
                this.props.user.username !==
                this.props.AuthReducer.user.username
                  ? this.deleteUser
                  : this.errorMessage
              }
            >
              delete
            </button>
            <button
              className={this.props.user.isAdmin ? 'hiddenElement' : ''}
              onClick={this.makeUserAdmin}
            >
              make Admin
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUsers: authActions.getUsers,
      deleteUser: authActions.deleteUser,
      makeAdmin: authActions.makeAdmin,
    },
    dispatch
  );

const connectedUserOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOverview);
export default connectedUserOverview;
