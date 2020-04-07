import {combineReducers} from 'redux';
import errorMessage from './errorMessage';
import error from './error';
import ingredients from './ingredients';
import loading from './loading';
import totalPrice from './totalPrice';
import building from './building';

export default combineReducers({
  error,
  errorMessage,
  ingredients,
  loading,
  totalPrice,
  building
})