import React from 'react';
import './CartTable.css';

const DefaultCartTable = ({
  validCartItems,
  onQuantityIncrement,
  onQuantityDecrement,
  handleRemoveFromCart
}) => {
  return (
    <table className="custom-table">
      <thead>
        <tr className='below'>
          <th style={{ width: '8%' }}></th>
          <th style={{ width: '8%' }}></th>
          <th style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>PRODUCT</th>
          <th style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>PRICE</th>
          <th style={{ width: '13%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>QUANTITY</th>
          <th style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>SUBTOTAL</th>
        </tr>
      </thead>
      <tbody>
        {validCartItems.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ fontSize: '11px', padding: '14px', fontWeight: '600' }}>No products added to the cart</td>
          </tr>
        ) : (
          validCartItems.map(([productId, product]) => {
            const imgSrc = product.img || '';

            return (
              <tr key={productId}>
                <td data-label="Remove">
                  <button style={{ color: 'red', fontWeight: '900', backgroundColor: '#f4f4f4' }} onClick={() => handleRemoveFromCart(productId)}>x</button>
                </td>
                <td data-label="Image">
                  {imgSrc && <img src={imgSrc} alt={product.name} style={{ width: '50px', height: '50px' }} />}
                </td>
                <td data-label="Product" style={{ color: '#f28c28' }}>{product.name}</td>
                <td data-label="Price" style={{ color: '#f28c28' }}>${product.price}</td>
                <td data-label="Quantity" style={{ color: '#f28c28' }}>
                  <button
                    style={{ marginRight: '8px', backgroundColor: '#f4f4f4', color: 'red' }}
                    onClick={() => onQuantityDecrement(productId, product.qty)}>
                    -
                  </button>
                  {product.qty}
                  <button
                    style={{ marginLeft: '8px', backgroundColor: '#f4f4f4', color: 'red' }}
                    onClick={() => onQuantityIncrement(productId, product.qty)}>
                    +
                  </button>
                </td>
                <td data-label="Subtotal" style={{ color: '#f28c28' }}>${(product.price * product.qty).toFixed(2)}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default DefaultCartTable;
