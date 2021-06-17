import base64 from 'react-native-base64';

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

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
  console.log(encoded);
  const requestOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    headers: { Authorization: 'Basic ' + encoded },
    // body: JSON.stringify({ username, password }),
  };
  console.log(requestOptions);


  return fetch('http://localhost:8080/authenticate/login', requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

function handleResponse(response) {
  const authorizationHeader = response.headers.get('Authorization');

  return response.text().then((text) => {
    console.log('Receive result: ' + authorizationHeader);

    const data = text && JSON.parse(text);
    var token;
    if (authorizationHeader) token = authorizationHeader.split(' ')[0];

    if (!response.ok) {
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
  });
}

function logout() {
  console.error('logout');
}
