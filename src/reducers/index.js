import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';
import TabReducer from './TabReducer';
import MessageReducer from './MessageReducer';

const allReducers = combineReducers({
  AuthReducer,
  PostReducer,
  TabReducer,
  MessageReducer,
});

export default allReducers;
