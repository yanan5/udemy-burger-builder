import {combineReducers} from 'redux';
import ingredients from './ingredients';
import totalPrice from './totalPrice';
import error from './error';
import errorMessage from './errorMessage';
import orders from './orders';

export default combineReducers({
  ingredients,
  totalPrice,
  error,
  errorMessage,
  orders
})