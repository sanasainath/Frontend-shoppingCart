import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ReactSlider from 'react-slider';
import { getProductByCat } from '../action/productaction';
import { generatePublicUrl } from '../urlConfig';
import { getAllCategories } from '../action/categoryaction';
import './NotFoundComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { addToCart } from '../action/cartaction';
import debounce from 'lodash.debounce';

function NotFoundComponent() {
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.getproductbycat.productsbycat);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (location && location.search && initialLoad) {
      const params = new URLSearchParams(location.search);
      const cid = params.get('cid');
      fetchProducts(cid, priceRange);
      setInitialLoad(false);
    }
  }, [location, priceRange, initialLoad]);

  const fetchProducts = useCallback(
    (cid, range) => {
      setLoading(true);
      dispatch(getProductByCat({ cid, minPrice: range[0], maxPrice: range[1] }))
        .finally(() => setLoading(false));
    },
    [dispatch]
  );

  const handleFilterClick = () => {
    if (location && location.search) {
      const params = new URLSearchParams(location.search);
      const cid = params.get('cid');
      fetchProducts(cid, priceRange);
    }
  };

  const debouncedHandlePriceChange = useMemo(
    () => debounce((newValue) => setPriceRange(newValue), 300),
    []
  );

  const handlePriceChange = (newValue) => {
    debouncedHandlePriceChange(newValue);
  };

  const handleAddToCart = (product) => {
    const { _id, name, price, productPictures } = product;
    dispatch(addToCart({ _id, name, price, productPictures }));
    toast.success("Product added to cart successfully!");
    navigate('/cart');
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const renderStars = (rating) => {
    if (!rating || rating < 0 || rating > 5) return null;

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="star-ratingz">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className="product-page-containerz">
      <div className="product-list-containerz">
        {loading ? (
          <div>Loading...</div>
        ) : products.length > 0 ? (
          products.map((productItem) => {
            const averageRating = calculateAverageRating(productItem.reviews);
            return (
              <div className="product-carddz" key={productItem._id}>
                <Link to={`/${productItem.slug}/${productItem._id}`}>
                  <div className="product-container21z">
                    <div className="product-imggz">
                      <img
                        src={generatePublicUrl(productItem.productPictures[0].img)}
                        alt={productItem.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="product-infoz">
                      <h3 className="product-namez">{productItem.name}</h3>
                      <p className="product-descriptionz">{productItem.description}</p>
                      <div className="product-ratingz">
                        {productItem.reviews && productItem.reviews.length > 0 ? (
                          renderStars(averageRating)
                        ) : (
                          <div>No ratings yet</div>
                        )}
                      </div>
                      <div className="product-pricez">${productItem.price}</div>
                    </div>
                  </div>
                </Link>
                <button className="add-to-cart1" onClick={() => handleAddToCart(productItem)}>
                  Add to Cart
                </button>
              </div>
            );
          })
        ) : (
          <div>No products found</div>
        )}
      </div>
      <div className="categories-container">
        <div className="price-range-bar">
          <p>Price Range</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={priceRange}
            min={0}
            max={1000}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            onChange={handlePriceChange}
          />
          <button onClick={handleFilterClick} className="button-down">Apply Filter</button>
        </div>
        <div className="catg">
          <p>Categories</p>
          <ul>
            {categories
              .filter((category) => category.children.length > 0)
              .flatMap((category) => category.children)
              .filter((subcategory) => subcategory.children.length === 0)
              .map((subcategory) => (
                <li key={subcategory._id}>
                  {subcategory.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <ToastContainer position="top-end" />
    </div>
  );
}

export default NotFoundComponent;
