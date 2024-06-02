import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, getCartItems } from '../action/cartaction';
import CartTable from './CartTable';
import debounce from 'lodash.debounce';
import { BreadcrumbProvider } from './BreadcrumbContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CartPage.css';

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate, dispatch]);

  const validCartItems = Object.entries(cartItems || {}).filter(([key]) => key !== 'undefined');

  const debouncedIncrement = debounce((_id, qty) => {
    const item = cartItems[_id];
    if (item) {
      const { name, price, img } = item;
      dispatch(addToCart({ _id, name, price, img }, 1));
    }
  }, 500);

  const debouncedDecrement = debounce((_id, qty) => {
    const item = cartItems[_id];
    if (item) {
      const { name, price, img } = item;
      if (qty === 1) {
        return;
      }
      dispatch(addToCart({ _id, name, price, img }, -1));

      if (item.qty === 0) {
        handleRemoveFromCart(_id);
      }
    }
  }, 300);

  const calculateSubtotal = () => {
    if (!cartItems || typeof cartItems !== 'object') {
      return '0.00';
    }

    const subtotal = Object.entries(cartItems).reduce((acc, [productId, product]) => {
      return acc + product.price * product.qty;
    }, 0);

    return subtotal.toFixed(2);
  };

  const handleProceedToCheckout = () => {
    if (validCartItems.length === 0) {
      toast.warn('Your cart is empty. Add items to your cart before proceeding to checkout.');
      return;
    }
    navigate('/checkout');
  };

  useEffect(() => {
    return () => {
      debouncedIncrement.cancel();
      debouncedDecrement.cancel();
    };
  }, [debouncedIncrement, debouncedDecrement]);

  const onQuantityIncrement = (_id, qty) => {
    debouncedIncrement(_id, qty);
  };

  const onQuantityDecrement = (_id, qty) => {
    debouncedDecrement(_id, qty);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  if (!auth.authenticate) {
    return null;
  }

  return (
    <BreadcrumbProvider>
      <div className='wishlist-start'>
        <div className='wishlist-menu'>
          <div className='wishlist-menu1'>
            <Breadcrumb />
            <h2>Shopping Cart</h2>
            <CartTable
              validCartItems={validCartItems} 
              onQuantityIncrement={onQuantityIncrement}
              onQuantityDecrement={onQuantityDecrement}
              handleRemoveFromCart={handleRemoveFromCart}
              calculateSubtotal={calculateSubtotal}
              handleProceedToCheckout={handleProceedToCheckout}
            />
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{color:'teal',fontSize:'23px',fontWeight:'600'}}>Subtotal:</h3>
                <span>${calculateSubtotal()}</span>
              </div>
              <button
                style={{
                  background: '#FF5F1F',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </BreadcrumbProvider>
  );
}

export default CartPage;
