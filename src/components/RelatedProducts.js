import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedProducts.css';

const RelatedProducts = ({ relatedProducts, currentProductId, handleAddToCart }) => {
  return (
    <div className="ohonah">
      {relatedProducts && relatedProducts.length > 0 ? (
        relatedProducts
          .filter((relatedProduct) => relatedProduct._id !== currentProductId)
          .map((relatedProduct) => (
            <div className="opop" key={relatedProduct._id}>
              <Link to={`/product/${relatedProduct._id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={relatedProduct.productPictures.length > 0 && relatedProduct.productPictures[0].img}
                  alt={`Related Product ${relatedProduct.name}`}
                  className="related-product-image"
                />
                <p>Name: {relatedProduct.name}</p>
                <p>Price: ${relatedProduct.price.toFixed(2)}</p> {/* Ensures price is formatted properly */}
              </Link>
              <button className="add-to-cart1" onClick={() => handleAddToCart(relatedProduct)}>
                Add to Cart
              </button>
            </div>
          ))
      ) : (
        <p>No related products found</p>
      )}
    </div>
  );
};

export default RelatedProducts;
