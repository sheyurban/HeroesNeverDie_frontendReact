import axios from 'axios';
import { SERVER_URL } from '../config.json';

export const MESSAGES_LOADING_PENDING = 'MESSAGES_LOADED_PENDING';
export const MESSAGES_LOADED_SUCCESS = 'MESSAGES_LOADED_SUCCESS';
export const MESSAGES_LOADING_ERROR = 'MESSAGES_LOADING_ERROR';

export function getLoadingMessagesPendingAction() {
  return {
    type: MESSAGES_LOADING_PENDING,
  };
}

export function getLoadingMessagesSuccessAction(chats) {
  return {
    type: MESSAGES_LOADED_SUCCESS,
    chats: chats,
  };
}

export function getLoadingMessagesErrorAction(error) {
  return {
    type: MESSAGES_LOADING_ERROR,
    error: error,
  };
}

export function getMessages(accessToken) {
  console.log('Get messages');

  return (dispatch) => {
    dispatch(getLoadingMessagesPendingAction());
    messagesRoute(accessToken)
      .then(
        (messages) => {
          const action = getLoadingMessagesSuccessAction(messages);
          dispatch(action);
        },
        (error) => {
          dispatch(getLoadingMessagesErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getLoadingMessagesErrorAction(error));
      });
  };
}

function messagesRoute(accessToken) {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken },
  };

  return axios
    .get(SERVER_URL + '/message', requestOptions)
    .then(handleResponse)
    .then((messages) => {
      return messages;
    });
}

///////////////////////////////////////////////

export const OPEN_CHAT = 'OPEN_CHAT';
export const CLOSE_CHAT = 'CLOSE_CHAT';
export const SET_CHAT_USER = 'SET_CHAT_USER';

export function openChat(chat, user) {
  return {
    type: OPEN_CHAT,
    chat: chat,
  };
}

export function closeChat() {
  return {
    type: CLOSE_CHAT,
    chat: [],
  };
}

export function setChatUser(openChat) {
  return {
    type: SET_CHAT_USER,
    openChat: openChat,
  };
}

///////////////////////////////////////////////

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDING';
export const SEND_MESSAGE_ERROR = 'SEND_MESSAGE_ERROR';

export function getSendMessagePendingAction() {
  return {
    type: SEND_MESSAGE_PENDING,
  };
}

export function getSendMessageSuccessAction(message) {
  return {
    type: SEND_MESSAGE_SUCCESS,
    message: message,
  };
}

export function getSendMessageErrorAction(error) {
  return {
    type: SEND_MESSAGE_ERROR,
    error: error,
  };
}

export function sendMessage(data, accessToken) {
  console.log('Send message');

  return (dispatch) => {
    dispatch(getSendMessagePendingAction());
    sendMessageRoute(data, accessToken)
      .then(
        (messages) => {
          const action = getSendMessageSuccessAction(messages);
          dispatch(action);
        },
        (error) => {
          dispatch(getSendMessageErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getSendMessageErrorAction(error));
      });
  };
}

function sendMessageRoute(data, accessToken) {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + accessToken },
  };

  return axios
    .post(SERVER_URL + '/message/create', data, requestOptions)
    .then(handleResponse)
    .then((messages) => {
      return messages;
    });
}

///////////////////////////////////////////////
export const OPEN_MESSAGE_MODAL = 'OPEN_MESSAGE_MODAL';
export const CLOSE_MESSAGE_MODAL = 'CLOSE_MESSAGE_MODAL';

export function openModal(user) {
  return {
    type: OPEN_MESSAGE_MODAL,
    user: user
  };
}

export function closeModal() {
  return {
    type: CLOSE_MESSAGE_MODAL,
  };
}

///////////////////////////////////////////////

function handleResponse(response) {
  const data = JSON.stringify(response.data);

  if (!response.statusText === 'OK') {
    if (response.status === 401) {
      //   logout();
    }
    return Promise.reject('Could not load data');
  } else {
    return data;
  }
}
