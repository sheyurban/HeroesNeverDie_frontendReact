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
    .get('https://localhost:8080/post/home', requestOptions)
    .then(handleResponse)
    .then((posts) => {
      return posts;
    });
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
export const ADDING_GUIDE_SUCCESS = 'ADDING_GUIDE_SUCCESS';
export const ADDING_GUIDE_PENDING = 'ADDING_GUIDE_PENDING';
export const ADDING_GUIDE_ERROR = 'ADDING_GUIDE_ERROR';

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

export function getAddingGuideSuccessAction(post) {
  return {
    type: ADDING_GUIDE_SUCCESS,
    post: post,
  };
}

export function getAddingGuidePendingAction() {
  return {
    type: ADDING_GUIDE_PENDING,
    pending: true,
  };
}

export function getAddingGuideErrorAction(error) {
  return {
    type: ADDING_GUIDE_ERROR,
    error: error,
  };
}

export function addGuide(data, accessToken) {
  console.log('Add guide');

  return (dispatch) => {
    dispatch(getAddingGuidePendingAction());
    try {
      addGuideRoute(data, accessToken)
        .then(
          (post) => {
            const action = getAddingGuideSuccessAction(post);
            dispatch(action);
          },
          (error) => {
            dispatch(getAddingGuideErrorAction(error));
          }
        )
        .catch((error) => {
          dispatch(getAddingGuideErrorAction(error));
        });
    } catch (error) {
      console.log(error);
    }
  };
}

function addGuideRoute(data, accessToken) {
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
