import axios from 'axios';

export const POSTS_LOADING_PENDING = 'POSTS_LOADED_PENDING';
export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADING_ERROR = 'POSTS_LOADING_ERROR';

export function getLoadingPostsPendingAction() {
  return {
    type: POSTS_LOADING_PENDING,
  };
}

export function getLoadingPostsSuccessAction(posts) {
  return {
    type: POSTS_LOADED_SUCCESS,
    posts: posts,
  };
}

export function getLoadingPostsErrorAction(error) {
  return {
    type: POSTS_LOADING_ERROR,
    error: error,
  };
}

export function getPosts(accessToken) {
  console.log('Get posts');

  return (dispatch) => {
    dispatch(getLoadingPostsPendingAction());
    getFromServer(accessToken)
      .then(
        (posts) => {
          const action = getLoadingPostsSuccessAction(posts);
          dispatch(action);
        },
        (error) => {
          dispatch(getLoadingPostsErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getLoadingPostsErrorAction(error));
      });
  };
}

function getFromServer(accessToken) {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken },
  };

  return axios
    .get('https://localhost:8080/post', requestOptions)
    .then(handleResponse)
    .then((posts) => {
      return posts;
    });
}

function handleResponse(response) {
  const data = JSON.stringify(response.data);

  if (!response.statusText === 'OK') {
    if (response.status === 401) {
      //   logout();
    }
    return Promise.reject('Posts not available');
  } else {
    return data;
  }
}
