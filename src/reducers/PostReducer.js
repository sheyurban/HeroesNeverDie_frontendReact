import * as postActions from '../actions/PostActions';

const initialState = {
  posts: [],
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
    default:
      return state;
  }
}

export default PostReducer;
