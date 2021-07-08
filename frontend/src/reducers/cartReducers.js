import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product); // checking if same item is being added again in cart

      if (existItem) {
        // this is used to update qty or any other newly selected value to already existing one
        // console.log('exits');
        return {
          ...state, //spreading state object items to individual items
          cartItems: state.cartItems.map(
            (x) => (x.product === existItem.product ? item : x) //we are checking if already present item is there we update it in item array instead to putting it again
          ),
        };
      } else {
        console.log('new item');
        return {
          ...state,
          cartItems: [...state.cartItems, item], //  adding new item inside cartItems array
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }; //will remove item from array where id matches with the one passed in payload

    default:
      return state;
  }
};
