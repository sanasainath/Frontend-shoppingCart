import React from 'react';
import PropTypes from 'prop-types';

const WishlistTable = ({ wishlistItems = [], onRemove }) => {
  if (!Array.isArray(wishlistItems)) {
    return <div>Loading...</div>;
  }

  return (
    <table className="custom-table">
      <tbody>
        <tr className='below'>
          <td style={{ width: '8%', paddingTop: '3px', paddingBottom: '3px' }}></td>
          <td style={{ width: '8%' }}></td>
          <td style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px', paddingTop: '3px', paddingBottom: '3px' }}>PRODUCT</td>
          <td style={{ width: '15%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>PRICE</td>
          <td style={{ width: '20%', fontWeight: '650', textAlign: 'center', fontSize: '13px' }}>DESCRIPTION</td>
        </tr>
        {wishlistItems.length === 0 ? (
          <tr>
            <td colSpan="11" style={{ fontSize: '11px', padding: '14px', fontWeight: '600' }}>No products added to the wishlist</td>
          </tr>
        ) : (
          wishlistItems.map((item) => {
            const product = item.product;
            const imgSrc = product.productPictures.length > 0 ? product.productPictures[0].img : '';

            return (
              <tr key={product._id}>
                <td>
                  <button onClick={() => onRemove(product._id)} style={{ color: 'red', backgroundColor: '#f4f4f4' }}>x</button>
                </td>
                <td>
                  {imgSrc && <img src={imgSrc} alt={product.name} style={{ width: '50px', height: '50px' }} />}
                </td>
                <td style={{ color: '#f28c28' }}>{product.name}</td>
                <td style={{ color: '#f28c28' }}>${product.price}</td>
                <td style={{ color: '#f28c28' }}>{product.description}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

WishlistTable.propTypes = {
  wishlistItems: PropTypes.array,
  onRemove: PropTypes.func.isRequired
};

export default WishlistTable;
