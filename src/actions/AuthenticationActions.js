import base64 from 'react-native-base64';
import axios from 'axios';

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
    user: (userSession.user = null),
    accessToken: (userSession.accessToken = null),
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
    .post('https://localhost:8080/authenticate/login', encoded, requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

function handleResponse(response) {
  const authorizationHeader = response.headers.authorization;

  console.log('Receive result: ' + authorizationHeader);

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
