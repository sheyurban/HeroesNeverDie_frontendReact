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

export function getPosts(accessToken, category) {
  console.log('Get posts');

  return (dispatch) => {
    dispatch(getLoadingPostsPendingAction());
    getFromServer(accessToken, category)
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

function getFromServer(accessToken, category) {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken },
  };

  switch (category) {
    case 'home':
      return axios
        .get('https://localhost:8080/post/home', requestOptions)
        .then(handleResponse)
        .then((posts) => {
          return posts;
        });
    case 'discuss':
      return axios
        .get('https://localhost:8080/post/discuss', requestOptions)
        .then(handleResponse)
        .then((posts) => {
          return posts;
        });
    case 'groupsearch':
      return axios
        .get('https://localhost:8080/post/groupsearch', requestOptions)
        .then(handleResponse)
        .then((posts) => {
          return posts;
        });
    case 'guide':
      return axios
        .get('https://localhost:8080/post/guide', requestOptions)
        .then(handleResponse)
        .then((posts) => {
          return posts;
        });
    default:
      return axios
        .get('https://localhost:8080/post/home', requestOptions)
        .then(handleResponse)
        .then((posts) => {
          return posts;
        });
  }
}
///////////////////////////////////////////////
export const ADDING_LIKE_SUCCESS = 'ADDING_LIKE_SUCCESS';
export const ADDING_LIKE_PENDING = 'ADDING_LIKE_PENDING';
export const ADDING_LIKE_ERROR = 'ADDING_LIKE_ERROR';

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

export function addLike(id, accessToken) {
  console.log('Add like');

  return (dispatch) => {
    dispatch(getAddingLikePendingAction());
    try {
      addLikeRoute(id, accessToken)
        // getFromServer(accessToken)
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
    } catch (error) {
      console.log(error);
    }
  };
}

function addLikeRoute(id, accessToken) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };
  const data = { idPost: id };
  return axios
    .patch('https://localhost:8080/post/like', data, requestOptions)
    .then(handleResponse)
    .then((post) => {
      return post;
    });
}

////////////////////////////////////////////////////
export const ADDING_POST_SUCCESS = 'ADDING_POST_SUCCESS';
export const ADDING_POST_PENDING = 'ADDING_POST_PENDING';
export const ADDING_POST_ERROR = 'ADDING_POST_ERROR';

export const SHOW_ADD_DIALOG = 'SHOW_ADD_DIALOG';
export const HIDE_ADD_DIALOG = 'HIDE_ADD_DIALOG';

export function getShowAddDialogAction() {
  return {
    type: SHOW_ADD_DIALOG,
  };
}

export function getHideAddDialogAction() {
  return {
    type: HIDE_ADD_DIALOG,
  };
}

export function getAddingPostSuccessAction(post) {
  return {
    type: ADDING_POST_SUCCESS,
    post: post,
  };
}

export function getAddingPostPendingAction() {
  return {
    type: ADDING_POST_PENDING,
    pending: true,
  };
}

export function getAddingPostErrorAction(error) {
  return {
    type: ADDING_POST_ERROR,
    error: error,
  };
}

export function addPost(data, accessToken) {
  console.log('Add guide');

  return (dispatch) => {
    dispatch(getAddingPostPendingAction());
    try {
      addPostRoute(data, accessToken)
        .then(
          (post) => {
            const action = getAddingPostSuccessAction(post);
            dispatch(action);
          },
          (error) => {
            dispatch(getAddingPostErrorAction(error));
          }
        )
        .catch((error) => {
          dispatch(getAddingPostErrorAction(error));
        });
    } catch (error) {
      console.log(error);
    }
  };
}

function addPostRoute(data, accessToken) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };
  return axios
    .post('https://localhost:8080/post/create', data, requestOptions)
    .then(handleResponse)
    .then((post) => {
      return post;
    });
}

///////////////////////////////////////////////////

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_PENDING = 'DELETE_POST_PENDING';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

export function getDeletePostSuccessAction(post) {
  return {
    type: DELETE_POST_SUCCESS,
    post: post,
  };
}

export function getDeletePostPendingAction() {
  return {
    type: DELETE_POST_PENDING,
    pending: true,
  };
}

export function getDeletePostErrorAction(error) {
  return {
    type: DELETE_POST_ERROR,
    error: error,
  };
}

export function deletePost(data, accessToken) {
  console.log('Delete post');

  return (dispatch) => {
    dispatch(getDeletePostPendingAction());
    try {
      deletePostRoute(data, accessToken)
        .then(
          (post) => {
            const action = getDeletePostSuccessAction(post);
            dispatch(action);
          },
          (error) => {
            dispatch(getDeletePostErrorAction(error));
          }
        )
        .catch((error) => {
          dispatch(getDeletePostErrorAction(error));
        });
    } catch (error) {
      console.log(error);
    }
  };
}

function deletePostRoute(data, accessToken) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    data: data,
  };
  console.log(accessToken);
  return axios
    .delete('https://localhost:8080/post/delete', requestOptions)
    .then(handleResponse)
    .then((post) => {
      return post;
    });
}

///////////////////////////////////////////////////

export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_PENDING = 'UPDATE_POST_PENDING';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';

export const UPDATE_MODE_SHOW = 'UPDATE_MODE_SHOW';
export const UPDATE_MODE_HIDE = 'UPDATE_MODE_HIDE';

export function showUpdateMode(post) {
  return {
    type: UPDATE_MODE_SHOW,
    post: post,
  };
}
export function hideUpdateMode() {
  return {
    type: UPDATE_MODE_HIDE,
  };
}

export function getUpdatePostSuccessAction(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    post: post,
  };
}

export function getUpdatePostPendingAction() {
  return {
    type: UPDATE_POST_PENDING,
    pending: true,
  };
}

export function getUpdatePostErrorAction(error) {
  return {
    type: UPDATE_POST_ERROR,
    pending: false,
    error: error,
  };
}

export function updatePost(data, accessToken) {
  console.log('Update post');

  return (dispatch) => {
    dispatch(getUpdatePostPendingAction());
    try {
      updatePostRoute(data, accessToken)
        .then(
          (post) => {
            const action = getUpdatePostSuccessAction(post);
            dispatch(action);
          },
          (error) => {
            dispatch(getUpdatePostErrorAction(error));
          }
        )
        .catch((error) => {
          dispatch(getUpdatePostErrorAction(error));
        });
    } catch (error) {
      console.log(error);
    }
  };
}

function updatePostRoute(data, accessToken) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };
  return axios
    .patch('https://localhost:8080/post/update', data, requestOptions)
    .then(handleResponse)
    .then((post) => {
      return post;
    });
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////

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

////////////////////////////////////////
