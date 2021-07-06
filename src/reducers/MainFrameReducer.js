import * as postActions from '../actions/PostActions';

const initialState = {
  posts: [],
};

function MainFrameReducer(state = initialState, action) {
  console.log('Reducer: ' + action.type);
  switch (action.type) {
    case postActions.POSTS_LOADED_SUCCESS:
      return {
        ...state,
        activeTab: action.posts,
      };

    default:
      return state;
  }
}

export default MainFrameReducer;
