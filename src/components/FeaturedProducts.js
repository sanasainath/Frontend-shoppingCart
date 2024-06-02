import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../action/productaction';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const dispatch = useDispatch();
  const featuredProducts = useSelector((state) => state.featuredProducts);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="featured-products-container">
      <h2 className="featured-products-title">Featured Products</h2>
      <div className="featured-products-grid">
        {featuredProducts.loading && <p>Loading...</p>}
        {featuredProducts.error && <p>Error: {featuredProducts.error}</p>}
        {featuredProducts.featuredProducts.map((product) => (
          <div key={product._id} className="featured-product">
            <Link to={`/${product.slug}/${product._id}`} style={{textDecoration:'none'}}className="featured-product-link">
              <img src={product.productPictures[0].img} alt={product.name} className="featured-product-img" />
              <div className="featured-product-details">
                <h3>{product.name}</h3>
                <p>{product.rating}</p>
                <p className="featured-product-price">Price: ${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
