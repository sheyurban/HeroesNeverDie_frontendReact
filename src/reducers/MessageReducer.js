import * as messageActions from '../actions/MessageActions';

const initialState = {
  chats: [],
  chat: [],
  showSingleChat: false,
  pending: false,
  error: null,
  message: {},
  openChat: '',
  openModal: false,
  messageTo: '',
};

function MessageActions(state = initialState, action) {
  console.log('Reducer: ' + action.type);
  switch (action.type) {
    case messageActions.MESSAGES_LOADED_SUCCESS:
      return {
        ...state,
        chats: action.chats,
        pending: false,
      };
    case messageActions.MESSAGES_LOADING_PENDING:
      return {
        ...state,
        pending: true,
      };
    case messageActions.MESSAGES_LOADING_ERROR:
      return {
        ...state,
        error: action.error,
        pending: false,
      };
    case messageActions.OPEN_CHAT:
      return {
        ...state,
        error: null,
        chat: action.chat,
        showSingleChat: true,
      };
    case messageActions.CLOSE_CHAT:
      return {
        ...state,
        error: null,
        chat: action.chat,
        showSingleChat: false,
        openChat: '',
      };
    case messageActions.SET_CHAT_USER:
      return {
        ...state,
        error: null,
        openChat: action.openChat,
      };
    case messageActions.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.message,
        pending: false,
      };
    case messageActions.SEND_MESSAGE_PENDING:
      return {
        ...state,
        pending: true,
      };
    case messageActions.SEND_MESSAGE_ERROR:
      return {
        ...state,
        error: action.error,
        pending: false,
      };

    case messageActions.OPEN_MESSAGE_MODAL:
      return {
        ...state,
        openModal: true,
        messageTo: action.user,
      };
    case messageActions.CLOSE_MESSAGE_MODAL:
      return {
        ...state,
        openModal: false,
        messageTo: '',
      };

    default:
      return state;
  }
}

export default MessageActions;
