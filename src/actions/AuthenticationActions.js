import base64 from 'react-native-base64';
import axios from 'axios';
import { SERVER_URL } from '../config.json';

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const AUTHENTICATION_LOGOUT = 'AUTHENTICATION_LOGOUT';

export function getShowLoginDialogAction() {
  return {
    type: SHOW_LOGIN_DIALOG,
  };
}

export function getHideLoginDialogAction() {
  return {
    type: HIDE_LOGIN_DIALOG,
  };
}

export function getAuthenticationPendingAction() {
  return {
    type: AUTHENTICATION_PENDING,
  };
}

export function getAuthenticationSuccessAction(userSession) {
  return {
    type: AUTHENTICATION_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken,
  };
}

export function logOutUser(userSession) {
  return {
    type: AUTHENTICATION_LOGOUT,
    user: null,
    accessToken: null,
  };
}

export function getAuthenticationErrorAction(error) {
  return {
    type: AUTHENTICATION_ERROR,
    error: error,
  };
}

export function authenticateUser(username, password) {
  console.log('Authenticate');

  return (dispatch) => {
    dispatch(getAuthenticationPendingAction());
    login(username, password)
      .then(
        (userSession) => {
          const action = getAuthenticationSuccessAction(userSession);
          dispatch(action);
        },
        (error) => {
          console.log(error);
          dispatch(getAuthenticationErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAuthenticationErrorAction(error));
      });
  };
}

function login(username, password) {
  const encoded = base64.encode(username + ':' + password);
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: 'Basic ' + encoded },
  };

  return axios
    .post(SERVER_URL +'/authenticate/login', encoded, requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

function handleResponse(response) {
  const authorizationHeader = response.headers.authorization;

  const data = response.data;
  var token;
  if (authorizationHeader) token = authorizationHeader.split(' ')[1];

  if (!response.statusText === 'OK') {
    if (response.status === 401) {
      logout();
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  } else {
    let userSession = {
      user: data,
      accessToken: token,
    };
    return userSession;
  }
}

function logout() {
  console.error('logout');
  return (dispatch) => {
    dispatch(getAuthenticationPendingAction());
  };
}

//////////////////////////////////////////////

export const REGISTER_PENDING = 'REGISTER_PENDING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export function getRegisterPendingAction() {
  return {
    type: REGISTER_PENDING,
  };
}

export function getRegisterSuccessAction(message) {
  return {
    type: REGISTER_SUCCESS,
    message: message,
  };
}

export function getRegisterErrorAction(error) {
  return {
    type: REGISTER_ERROR,
    error: error,
  };
}

export function registerUser(username, password, email) {
  console.log('register');

  return (dispatch) => {
    dispatch(getRegisterPendingAction());
    register(username, password, email)
      .then(
        (userSession) => {
          const action = getRegisterSuccessAction(userSession);
          dispatch(action);
        },
        (error) => {
          console.log(error);
          dispatch(getRegisterErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getRegisterErrorAction(error));
      });
  };
}

function register(username, password, email) {
  const data = { username, password, email };
  const requestOptions = {
    method: 'POST',
  };

  return axios
    .post(SERVER_URL + '/users/register', data, requestOptions)
    .then(handleResponseUsers)
    .then((message) => {
      return message;
    });
}
//////////////////////////////////////////////////
export const USERS_LOADING_PENDING = 'USERS_LOADING_PENDING';
export const USERS_LOADED_SUCCESS = 'USERS_LOADED_SUCCESS';
export const USERS_LOADING_ERROR = 'USERS_LOADING_ERROR';

export function getLoadingUsersPendingAction() {
  return {
    type: USERS_LOADING_PENDING,
  };
}

export function getLoadingUsersSuccessAction(users) {
  return {
    type: USERS_LOADED_SUCCESS,
    users: users,
  };
}

export function getLoadingUsersErrorAction(error) {
  return {
    type: USERS_LOADING_ERROR,
    error: error,
  };
}

export function getUsers(accessToken) {
  console.log('getUsers');

  return (dispatch) => {
    dispatch(getLoadingUsersPendingAction());
    getUsersRoute(accessToken)
      .then(
        (users) => {
          const action = getLoadingUsersSuccessAction(users);
          dispatch(action);
        },
        (error) => {
          dispatch(getLoadingUsersErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getLoadingUsersErrorAction(error));
      });
  };
}

function getUsersRoute(accessToken) {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken },
  };
  return axios
    .get(SERVER_URL +'/users', requestOptions)
    .then(handleResponseUsers)
    .then((users) => {
      return users;
    });
}

/////////////////////////////////////////////////////////
export const USER_DELETE_PENDING = 'USER_DELETE_PENDING';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_ERROR = 'USER_DELETE_ERROR';

export function getDeleteUserPendingAction() {
  return {
    type: USER_DELETE_PENDING,
    pending: true,
  };
}

export function getDeleteUserSuccessAction(user) {
  return {
    type: USER_DELETE_SUCCESS,
    user: user,
  };
}

export function getDeleteUserErrorAction(error) {
  return {
    type: USER_DELETE_ERROR,
    error: error,
  };
}

export function deleteUser(data, accessToken) {
  console.log('getUsers');

  return (dispatch) => {
    dispatch(getLoadingUsersPendingAction());
    deleteUserRoute(data, accessToken)
      .then(
        (users) => {
          const action = getLoadingUsersSuccessAction(users);
          dispatch(action);
        },
        (error) => {
          dispatch(getLoadingUsersErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getLoadingUsersErrorAction(error));
      });
  };
}

function deleteUserRoute(data, accessToken) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    data: data,
  };
  console.log(accessToken);
  return axios
    .delete(SERVER_URL +'/users/delete', requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}
/////////////////////////////////////////////////////////
export const REGISTER_MODAL = 'REGISTER_MODAL';
export const LOGIN_MODAL = 'LOGIN_MODAL';

export function getRegisterModal() {
  return {
    type: REGISTER_MODAL,
  };
}

export function getLoginModal() {
  return {
    type: LOGIN_MODAL,
  };
}

/////////////////////////////////////////////////////////
export const MAKE_ADMIN_SUCCESS = 'MAKE_ADMIN_SUCCESS';
export const MAKE_ADMIN_PENDING = 'MAKE_ADMIN_PENDING';
export const MAKE_ADMIN_ERROR = 'MAKE_ADMIN_ERROR';

export function getMakeAdminSuccess() {
  return {
    type: MAKE_ADMIN_SUCCESS,
  };
}

export function getMakeAdminPending() {
  return {
    type: MAKE_ADMIN_PENDING,
  };
}
export function getMakeAdminError(error) {
  return {
    type: MAKE_ADMIN_ERROR,
    error: error,
  };
}

export function makeAdmin(data, accessToken) {
  console.log('make Admin');

  return (dispatch) => {
    dispatch(getMakeAdminPending());
    makeAdmingRoute(data, accessToken)
      .then(
        (user) => {
          const action = getMakeAdminSuccess(user);
          dispatch(action);
        },
        (error) => {
          dispatch(getMakeAdminPending(error));
        }
      )
      .catch((error) => {
        dispatch(getMakeAdminPending(error));
      });
  };
}

function makeAdmingRoute(data, accessToken) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    data: data,
  };
  return axios
    .patch(SERVER_URL +'/users/admin', data, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

////////////////////////////////////////////////////////

function handleResponseUsers(response) {
  const data = JSON.stringify(response.data);

  if (!response.statusText === 'OK') {
    if (response.status === 401) {
      logout();
    }
    return Promise.reject('Could not load data');
  } else {
    return data;
  }
}
