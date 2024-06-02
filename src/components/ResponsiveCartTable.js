import React from 'react';
import './CartTable.css';

const ResponsiveCartTable = ({
  validCartItems,
  onQuantityIncrement,
  onQuantityDecrement,
  handleRemoveFromCart
}) => {
  return (
    <table className="custom-table responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {validCartItems.length === 0 ? (
          <tr>
            <td colSpan="4" className="no-products">No products added to the cart</td>
          </tr>
        ) : (
          validCartItems.map(([productId, product]) => {
            const imgSrc = product.img || '';

            return (
              <tr key={productId}>
                <td className="product-cell">
                  <div className="cell-header">Name</div>
                  {product.name}
                </td>
                <td className="price-cell">
                  <div className="cell-header">Price</div>
                  ${product.price}
                </td>
                <td className="quantity-cell">
                  <div className="cell-header">Quantity</div>
                  <button className="quantity-btn" onClick={() => onQuantityDecrement(productId, product.qty)}>-</button>
                  {product.qty}
                  <button className="quantity-btn" onClick={() => onQuantityIncrement(productId, product.qty)}>+</button>
                </td>
                <td className="subtotal-cell">
                  <div className="cell-header">Total</div>
                  ${(product.price * product.qty).toFixed(2)}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default ResponsiveCartTable;
