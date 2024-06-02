import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../action/admin/productalltypes';
import { Link } from 'react-router-dom';
import './ShopHead.css';
import { getAllCategories } from '../action/categoryaction';
import EndDetail from './EndDetail';
function ShopHead() {
  const dispatch = useDispatch();
  const { AllProducts, loading, error } = useSelector((state) => state.getallproducts);
  const categories = useSelector((state) => state.category.categories);
  const [flatCategories, setFlatCategories] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [tempMinPrice, setTempMinPrice] = useState('');
  const [tempMaxPrice, setTempMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const flatCategoriesObject = flattenCategories(categories);
      setFlatCategories(flatCategoriesObject);
    }
  }, [categories]);

  const flattenCategories = (categories) => {
    let flatCategoriesObject = {};
    categories.forEach(category => {
      let childrenIds = [];
      if (category.children && category.children.length > 0) {
        childrenIds = category.children.map(child => child._id);
      }
      flatCategoriesObject[category._id] = {
        categoryId: category._id,
        childrenIds: childrenIds
      };
      if (category.children && category.children.length > 0) {
        flatCategoriesObject = { ...flatCategoriesObject, ...flattenSubcategories(category.children) };
      }
    });
    return flatCategoriesObject;
  };

  const flattenSubcategories = (subcategories) => {
    let subcategoriesObject = {};
    subcategories.forEach(subcategory => {
      let childrenIds = [];
      if (subcategory.children && subcategory.children.length > 0) {
        childrenIds = subcategory.children.map(child => child._id);
      }
      subcategoriesObject[subcategory._id] = {
        categoryId: subcategory._id,
        childrenIds: childrenIds
      };
      if (subcategory.children && subcategory.children.length > 0) {
        subcategoriesObject = { ...subcategoriesObject, ...flattenSubcategories(subcategory.children) };
      }
    });
    return subcategoriesObject;
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handlePriceFilter = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const filterAndSortProducts = () => {
    if (AllProducts && AllProducts.products) {
      let updatedProducts = [...AllProducts.products];

      if (selectedCategoryId) {
        updatedProducts = updatedProducts.filter(product => {
          const productCategoryId = product.category._id;
          const selectedCategory = flatCategories[selectedCategoryId];
          const childCategoryIds = selectedCategory?.childrenIds || [];
          return productCategoryId === selectedCategoryId || childCategoryIds.includes(productCategoryId) || childCategoryIds.includes(product.category.parentId);
        });
      }

      if (minPrice !== '' || maxPrice !== '') {
        updatedProducts = updatedProducts.filter(product => {
          const productPrice = product.price;
          return (minPrice === '' || productPrice >= minPrice) && (maxPrice === '' || productPrice <= maxPrice);
        });
      }

      if (sortBy) {
        switch (sortBy) {
          case 'lowToHigh':
            updatedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'highToLow':
            updatedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'averageRating':
            updatedProducts.sort((a, b) => calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews));
            break;
          case 'latest':
            updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          default:
            break;
        }
      }

      setFilteredProducts(updatedProducts);
    }
  };

  useEffect(() => {
    filterAndSortProducts();
  }, [AllProducts, selectedCategoryId, minPrice, maxPrice, sortBy]);

  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="shop-container6">
        {error && <p>Error: {error}</p>}
        <div className="side-menu">
          <h4>Categories</h4>
          <div className="category-list6">
            {categories && categories.map((category) => (
              <div className="category-item111" key={category._id}>
                <div>
                  <input
                    type="radio"
                    id={category._id}
                    name="category"
                    value={category._id}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                </div>
                <div>
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
              </div>
            ))}
          </div>

          <div className="price-filter">
            <h4>Price Range</h4>
            <input
              type="number"
              placeholder="Min Price"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
            />
            <button onClick={() => handlePriceFilter()}>Apply</button>
          </div>
        </div>

        {/* Sorting options */}
        <div>
          <div className="sorting-filter">
            <h4>Sort By</h4>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Select</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="averageRating">Average Rating</option>
              <option value="latest">Latest</option>
            </select>
          </div>

          {filteredProducts && filteredProducts.length > 0 && (
            <div className='default-order'>
              <h2>All Products</h2>
              <div className="product-list6">
                {filteredProducts.map((product) => {
                  const averageRating = calculateAverageRating(product.reviews);
                  return (
                    <Link to={`/${product.slug}/${product._id}`} className="product-link6" key={product._id}>
                      <div key={product._id} className="product-card6">
                        <img src={product.productPictures[0].img} alt={product.name} />
                        <div className="product-info6">
                          <h3>{product.name}</h3>
                          <p className="price6">${product.price}</p>
                          {averageRating ? (
                            <p className="rating6">{renderStars(averageRating)} ({averageRating} / 5)</p>
                          ) : (
                            <p className="rating6">☆☆☆☆☆ (0.0/5)</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <EndDetail/>
    </>
  );
}

export default ShopHead;
