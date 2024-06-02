import React, { useState } from 'react';
import './SearchResults.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { searchResults, loading, error } = useSelector((state) => state.searchProduct);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredResults = searchResults.filter((result) => {
    const productPrice = result.price;
    const isWithinRange =
      (!minPrice || productPrice >= parseFloat(minPrice)) &&
      (!maxPrice || productPrice <= parseFloat(maxPrice));

    return isWithinRange;
  });

  const sortResults = (results) => {
    switch (sortBy) {
      case 'lowToHigh':
        return results.slice().sort((a, b) => a.price - b.price);
      case 'highToLow':
        return results.slice().sort((a, b) => b.price - a.price);
      case 'latest':
        return results.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'ratingsTop':
        return results.slice().sort((a, b) => calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews));
      default:
        return results;
    }
  };

  const sortedResults = sortResults(filteredResults);

  return (
    <div className="search-results">
      <h2 style={{ textAlign: 'center', color: 'gray', fontWeight: '400' }}>Search Results</h2>
      <div className='all-filters-go'>
        <div className="price-filters">
          <input
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input  
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="sorting-filter">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Select</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="latest">Latest</option>
            <option value="ratingsTop">Ratings: Top</option>
          </select>
        </div>
      </div>
      <div className="results-container" >
        {sortedResults.map((result) => (
          <Link to={`/${result.slug}/${result._id}`} key={result._id}>
            <div className="product-card23">
              <div className="product-image23">
                <img src={result.productPictures.length > 0 ? result.productPictures[0].img : 'placeholder-image-url'} alt={result.name} />
              </div>
              <div className="product-details23" >
                <h3>{result.name}</h3>
                <p className="product-price23" style={{ textDecoration: 'none' }}>${result.price.toFixed(2)}</p>
                <p className="product-rating23" style={{ textDecoration: 'none' }}>Rating: {calculateAverageRating(result.reviews)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
