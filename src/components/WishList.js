import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeWishlistItem } from '../action/wishlistaction';
import WishlistTable from './WishlistTable';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishItems.wishItems);

  useEffect(() => {
    dispatch(fetchWishlist());
    
  }, [dispatch]); 

  console.log("wishlist items are", wishlist);

  const handleRemoveFromWishlist = (productId) => {
    // Implement the remove functionality
    console.log("remove clicked")
    dispatch(removeWishlistItem(productId));
  };

  return (
    <div className="wishlist" style={{padding:'0px 15px'}}>
      <h2>Your Wishlist</h2>
      <WishlistTable wishlistItems={wishlist} onRemove={handleRemoveFromWishlist} />
    </div>
  );
};

export default Wishlist;
