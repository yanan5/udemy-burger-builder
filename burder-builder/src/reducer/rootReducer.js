import {combineReducers} from 'redux';
import ingredients from './ingredients';
import totalPrice from './totalPrice';
import orders from './orders';

export default combineReducers({
  ingredients,
  totalPrice,
  orders
})