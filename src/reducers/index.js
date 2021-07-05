import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';

const allReducers = combineReducers({
  AuthReducer,
  PostReducer,
});

export default allReducers;
