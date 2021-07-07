import * as postActions from '../actions/PostActions';

const initialState = {
  posts: [],
  post: null,
  showAddDialog: false,
  updateMode: false,
};

function PostReducer(state = initialState, action) {
  console.log('Reducer: ' + action.type);
  switch (action.type) {
    case postActions.POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        pending: false,
      };
    case postActions.POSTS_LOADING_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case postActions.POSTS_LOADING_ERROR:
      return {
        ...state,
        error: 'Could not load posts',
        pending: false,
      };
    case postActions.ADDING_LIKE_SUCCESS:
      return {
        ...state,
        post: action.post,
        pending: false,
      };
    case postActions.ADDING_LIKE_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case postActions.ADDING_LIKE_ERROR:
      return {
        ...state,
        error: 'Could not add like',
        pending: false,
      };
    case postActions.SHOW_ADD_DIALOG:
      return {
        ...state,
        showAddDialog: true,
        error: null,
      };

    case postActions.HIDE_ADD_DIALOG:
      return {
        ...state,
        showAddDialog: false,
        error: null,
      };
    case postActions.ADDING_POST_SUCCESS:
      return {
        ...state,
        showAddDialog: false,
        error: null,
        post: action.post,
        pending: false,
      };
    case postActions.ADDING_POST_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case postActions.ADDING_POST_ERROR:
      return {
        ...state,
        error: 'Could not add guide',
        pending: false,
      };
    case postActions.DELETE_POST_SUCCESS:
      return {
        ...state,
        showAddDialog: false,
        error: null,
        pending: false,
      };
    case postActions.DELETE_POST_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case postActions.DELETE_POST_ERROR:
      return {
        ...state,
        error: 'Could not delete post',
        pending: false,
      };
    case postActions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        showAddDialog: false,
        error: null,
        pending: false,
        updateMode: false,
      };
    case postActions.UPDATE_POST_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case postActions.UPDATE_POST_ERROR:
      return {
        ...state,
        error: 'Could not update post',
        pending: false,
      };
    case postActions.UPDATE_MODE_SHOW:
      return {
        ...state,
        updateMode: true,
        post: action.post,
      };
    case postActions.UPDATE_MODE_HIDE:
      return {
        ...state,
        updateMode: false,
      };
    default:
      return state;
  }
}

export default PostReducer;
