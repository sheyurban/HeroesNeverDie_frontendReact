import axios from 'axios';

export const POSTS_LOADING_PENDING = 'POSTS_LOADED_PENDING';
export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADING_ERROR = 'POSTS_LOADING_ERROR';
export const ADDING_LIKE_SUCCESS = 'ADDING_LIKE_SUCCESS';
export const ADDING_LIKE_PENDING = 'ADDING_LIKE_PENDING';
export const ADDING_LIKE_ERROR = 'ADDING_LIKE_ERROR';

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
///////////////////////////////////////////////

export function getAddingLikeSuccessAction(post) {
  return {
    type: ADDING_LIKE_SUCCESS,
    post: post,
  };
}

export function getAddingLikePendingAction() {
  return {
    type: ADDING_LIKE_PENDING,
    pending: true,
  };
}

export function getAddingLikeErrorAction(error) {
  return {
    type: ADDING_LIKE_ERROR,
    error: error,
  };
}

///////////////////////////////////////////////////

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
    .then(handleResponseGetPosts)
    .then((posts) => {
      return posts;
    });
}

function handleResponseGetPosts(response) {
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

////////////////////////////////////////

export function addLike(id, accessToken) {
  console.log('Add like');

  return (dispatch) => {
    dispatch(getAddingLikePendingAction());
    addLikeRoute(id, accessToken)
      .then(
        (post) => {
          const action = getAddingLikeSuccessAction(post);
          dispatch(action);
        },
        (error) => {
          dispatch(getAddingLikeErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAddingLikeErrorAction(error));
      });
  };
}

function addLikeRoute(id, accessToken) {
  console.log(accessToken)
  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };
  const data = { idPost: id };
  axios
    .patch('https://localhost:8080/post/like', data, requestOptions)
    .then((response) => {
      console.log(response)
      if (!response.statusText === 'OK') {
        if (response.status === 401) {
          //   logout();
        }
        return Promise.reject('Like could not be added');
      }
      return JSON.stringify(response.data);
    });
}

function handleResponseAddLike(response){
  console.log(response)
  if (!response.statusText === 'OK') {
    if (response.status === 401) {
      //   logout();
    }
    return Promise.reject('Like could not be added');
  }
  return JSON.stringify(response.data);
}
