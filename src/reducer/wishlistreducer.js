import { ADD_WISHLIST_ITEM,REMOVE_WISHLIST_ITEM,FETCH_WISHLIST,WISHLIST_ERROR } from "../action/constants";

const initialState = {
  wishItems: [],
  loading: false,
  error: null
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_WISHLIST:
          return {
              ...state,
              wishItems: action.payload,
              loading: false,
              error: null
          };
      case ADD_WISHLIST_ITEM:
      case REMOVE_WISHLIST_ITEM:
          return {
              ...state,
              wishItems: action.payload,
              loading: false,
              error: null
          };
      case WISHLIST_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload
          };
      default:
          return state;
  }
};

export default wishlistReducer;
