import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //used to make async requests
import { composeWithDevTools } from 'redux-devtools-extension'; // used to connect chrome redux-devtools extension with our app
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
} from './reducers/userReducers';
// createStore -> create store for storing actions and reducers
// combineReducers -> multple reducers are combined to pass in store func
// applyMiddleware -> used to include any middleware required

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
}); //will hold all reducers created for app in state (this is global state for app)

// const rootReducer = (state, action) => {
//   // when a logout action is dispatched it will reset redux state
//   console.log(action.type);
//   if (action.type === 'USER_LOGOUT') {
//     state.userDetails = undefined;
//   }

//   return reducer(state, action);
// };

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  cart: { cartItems: cartItemsFromStorage }, //setting cart reducer state , cartItems array setitng to cartItemsFromStorage
  userLogin: { userInfo: userInfoFromStorage },
};
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
