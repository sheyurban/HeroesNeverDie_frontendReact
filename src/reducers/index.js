import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';
import TabReducer from './TabReducer';

const allReducers = combineReducers({
  AuthReducer,
  PostReducer,
  TabReducer,
});

export default allReducers;
