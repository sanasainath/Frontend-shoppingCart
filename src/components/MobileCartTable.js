import React from 'react';
import './MobileCartTable.css';

const MobileCartTable = ({
  validCartItems,
  onQuantityIncrement,
  onQuantityDecrement,
  handleRemoveFromCart,
  calculateSubtotal,
  handleProceedToCheckout
}) => {
  return (
    <div className="mobile-cart-table">
      {validCartItems.length === 0 ? (
        <div style={{ fontSize: '11px', padding: '14px', fontWeight: '600' }}>No products added to the cart</div>
      ) : (
        validCartItems.map(([productId, product]) => {
          const imgSrc = product.img || '';

          return (
            <div key={productId} className="mobile-cart-item">
              <div className="mobile-cart-item-header">
                <button style={{ color: 'red', fontWeight: '900', backgroundColor: '#f4f4f4' }} onClick={() => handleRemoveFromCart(productId)}>x</button>
              </div>
              <div className="mobile-cart-item-body">
                {imgSrc && <img src={imgSrc} alt={product.name} style={{ width: '50px', height: '50px' }} />}
                <div style={{ color: '#f28c28', paddingLeft: '0px' }}>{product.name}</div>
                <div style={{ color: '#f28c28' }}>${product.price}</div>
                <div style={{ color: '#f28c28' }}>
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
                </div>
                <div style={{ color: '#f28c28' }}>${(product.price * product.qty).toFixed(2)}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MobileCartTable;