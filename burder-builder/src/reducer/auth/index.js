import {combineReducers} from 'redux';
import userId from './userId';
import error from './error';
import loading from './loading';
import token from './token';

export default combineReducers({
  userId,
  error,
  loading,
  token
})