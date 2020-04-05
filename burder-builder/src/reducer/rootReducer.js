import {combineReducers} from 'redux';
import ingredients from './ingredients';
import totalPrice from './totalPrice';
import error from './error';
import errorMessage from './errorMessage';
import orders from './orders';
import loading from './loading';

export default combineReducers({
  ingredients,
  totalPrice,
  error,
  loading,
  errorMessage,
  orders
})