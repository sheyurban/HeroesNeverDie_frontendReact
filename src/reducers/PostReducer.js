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
      };

    default:
      return state;
  }
}

export default PostReducer;
