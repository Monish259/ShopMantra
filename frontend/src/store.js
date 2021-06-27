import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //used to make async requests
import { composeWithDevTools } from 'redux-devtools-extension'; // used to connect chrome redux-devtools extension with our app
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
// createStore -> create store for storing actions and reducers
// combineReducers -> multple reducers are combined to pass in store func
// applyMiddleware -> used to include any middleware required

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
}); //will hold all reducers created for app in state
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
//  @createStore parameters
//  1 reducer list
//  2 initialState
//  3 middlewares list

export default store;
