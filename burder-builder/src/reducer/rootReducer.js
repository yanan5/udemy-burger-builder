import {combineReducers} from 'redux';
import orders from './orders';
import auth from './auth';
import burger from './burger';

export default combineReducers({
  burger,
  orders,
  auth
})