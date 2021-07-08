import * as authenticationActions from '../actions/AuthenticationActions';

const initialState = {
  user: null,
  loginPending: false,
  showLoginDialog: false,
  users: [],
  showRegisterModal: false,
  message: '',
};

function authReducer(state = initialState, action) {
  console.log('Reducer: ' + action.type);
  switch (action.type) {
    case authenticationActions.SHOW_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
        error: null,
      };
    case authenticationActions.HIDE_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
        error: null,
      };
    case authenticationActions.AUTHENTICATION_PENDING: {
      return {
        ...state,
        pending: true,
        error: null,
      };
    }
    case authenticationActions.AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        showLoginDialog: false,
        pending: false,
        user: action.user,
        accessToken: action.accessToken,
        message: '',
      };
    }
    case authenticationActions.AUTHENTICATION_ERROR: {
      return {
        ...state,
        pending: false,
        error:
          'Login failed. Verify your account and check username and password.',
      };
    }
    case authenticationActions.AUTHENTICATION_LOGOUT: {
      return {
        ...state,
        showLoginDialog: false,
        pending: false,
        user: action.user,
        accessToken: action.accessToken,
      };
    }
    case authenticationActions.USERS_LOADING_PENDING: {
      return {
        ...state,
        pending: true,
        error: null,
      };
    }
    case authenticationActions.USERS_LOADED_SUCCESS: {
      return {
        ...state,
        users: action.users,
        pending: false,
      };
    }
    case authenticationActions.USERS_LOADING_ERROR: {
      return {
        ...state,
        pending: false,
        error: 'Could not load users',
      };
    }
    case authenticationActions.USER_DELETE_PENDING: {
      return {
        ...state,
        pending: true,
        error: null,
      };
    }
    case authenticationActions.USER_DELETE_SUCCESS: {
      return {
        ...state,
        pending: false,
      };
    }
    case authenticationActions.USER_DELETE_ERROR: {
      return {
        ...state,
        pending: false,
        error: 'Could not delete users',
      };
    }
    case authenticationActions.REGISTER_MODAL:
      return {
        ...state,
        showRegisterModal: true,
        error: null,
      };
    case authenticationActions.LOGIN_MODAL:
      return {
        ...state,
        showRegisterModal: false,
        error: null,
      };
    case authenticationActions.REGISTER_PENDING: {
      return {
        ...state,
        pending: true,
        error: null,
      };
    }
    case authenticationActions.REGISTER_SUCCESS: {
      return {
        ...state,
        showLoginDialog: true,
        pending: false,
        message:
          'Your registration was successful. Verify your email to log in.',
        showRegisterModal: false,
      };
    }
    case authenticationActions.REGISTER_ERROR: {
      return {
        ...state,
        pending: false,
        error: 'Registration failed. Please try again.',
      };
    }
    case authenticationActions.MAKE_ADMIN_SUCCESS: {
      return {
        ...state,
        pending: false,
      };
    }
    case authenticationActions.MAKE_ADMIN_PENDING: {
      return {
        ...state,
        pending: true,
      };
    }
    case authenticationActions.MAKE_ADMIN_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
