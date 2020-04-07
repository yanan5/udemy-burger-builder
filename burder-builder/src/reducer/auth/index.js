import {combineReducers} from 'redux';
import userId from './userId';
import error from './error';
import loading from './loading';
import token from './token';
import authRedirectPath from './authRedirectPath';

export default combineReducers({
  userId,
  error,
  loading,
  token,
  authRedirectPath
})