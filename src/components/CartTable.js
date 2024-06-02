import React from 'react';
import useWindowSize from './WindowSize';
import DefaultCartTable from './DefaultCartTable';
import ResponsiveCartTable from './ResponsiveCartTable';
import './CartTable.css';

const CartTable = ({
  validCartItems,
  onQuantityIncrement,
  onQuantityDecrement,
  handleRemoveFromCart,
  calculateSubtotal,
  handleProceedToCheckout
}) => {
  const size = useWindowSize();

  return size.width > 768 ? (
    <DefaultCartTable
      validCartItems={validCartItems}
      onQuantityIncrement={onQuantityIncrement}
      onQuantityDecrement={onQuantityDecrement}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  ) : (
    <ResponsiveCartTable
      validCartItems={validCartItems}
      onQuantityIncrement={onQuantityIncrement}
      onQuantityDecrement={onQuantityDecrement}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  );
};

export default CartTable;
