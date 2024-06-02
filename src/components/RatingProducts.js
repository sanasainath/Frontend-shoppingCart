import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../action/admin/productalltypes';
import './RatingProducts.css';
import { Link } from 'react-router-dom';

function RatingProducts() {
  const dispatch = useDispatch();
  const { AllProducts, loading, error } = useSelector((state) => state.getallproducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Function to calculate average rating of a product
  const calculateAverageRating = (product) => {
    const totalRating = product.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return totalRating / product.reviews.length;
  };

  // Filter products that have reviews
  const productsWithReviews = AllProducts.products?.filter(product => product.reviews.length > 0);

  // Sort products by rating in descending order
  const sortedProducts = productsWithReviews?.sort((a, b) => {
    const averageRatingA = calculateAverageRating(a);
    const averageRatingB = calculateAverageRating(b);
    return averageRatingB - averageRatingA;
  });

  return (
    <div className="top-rated-products">
      <h2 style={{color:'gray'}}>Top Rated Products</h2>
      <div className="product-list30">
        {sortedProducts?.map((product) => (
          <Link to={`/${product.slug}/${product._id}`} className="product-link" key={product._id}>
            <div className="product-card334">
              <img src={product.productPictures[0]?.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Average Rating: {calculateAverageRating(product)}</p>
              <p>Price: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RatingProducts;
