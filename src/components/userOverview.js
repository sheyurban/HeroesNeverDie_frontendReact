import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../layout/css/userOverview.css';

import { bindActionCreators } from 'redux';
import * as authActions from '../actions/AuthenticationActions';

import UserRow from './userRow';

const mapStateToProps = (state) => {
  return state;
};

class UserOverview extends Component {
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers(this.props.AuthReducer.accessToken);
  }

  renderUsers(users) {
    return users.map((user) => <UserRow user={user} />);
  }

  render() {
    let users = [];
    users = this.props.AuthReducer.users;
    let userComp;
    if (users === undefined || users.length < 1) userComp = 'LOADING';
    else {try {
        
        userComp = this.renderUsers(JSON.parse(users));
    } catch (error) {
        console.log(error)
    }
    }
    return (
      <div id="userOverview" className="userOverview">
        <div className="tableGS">
          <div className="header">
            <span>USERNAME</span>
            <span>EMAIL</span>
            <span>isADMIN</span>
            <span>BUTTONS</span>
          </div>

          {userComp}
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
    },
    dispatch
  );

const connectedUserOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOverview);
export default connectedUserOverview;
