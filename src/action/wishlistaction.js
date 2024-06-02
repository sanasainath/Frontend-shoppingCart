import {
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
  FETCH_WISHLIST,
  WISHLIST_ERROR
} from './constants';
import useEffect from 'react'
import axiosInstance from '../helper/axios';

export const fetchWishlist = () => async (dispatch) => {
  try {
      const response = await axiosInstance.get('/get/all/wishlist/items');
      dispatch({ type: FETCH_WISHLIST, payload: response.data.wishlist });
  } catch (error) {
      console.error('Error fetching wishlist:', error);
      dispatch({ type: WISHLIST_ERROR, payload: error.message });
  }
};

export const addWishlistItem = (productId) => async (dispatch) => {
  try {
      const response = await axiosInstance.post('/wishlist/add', { productId });
   
      console.log("Adding wish item is successful",response)
      dispatch({ type: ADD_WISHLIST_ITEM, payload: response.data.wishlist });
  } catch (error) {
      console.error('Error adding wishlist item:', error);
      dispatch({ type: WISHLIST_ERROR, payload: error.message });
  }
};

export const removeWishlistItem = (productId) => async (dispatch) => {
  try {
    console.log("product id from wishlist",productId);
      const response = await axiosInstance.post('/list/remove', { productId });
      console.log("deketui okkkkkkkkkkkk",response);
      dispatch({ type: REMOVE_WISHLIST_ITEM, payload: response.data.wishlist });
  } catch (error) {
      console.error('Error removing wishlist item:', error);
      dispatch({ type: WISHLIST_ERROR, payload: error.message });
  }
};
