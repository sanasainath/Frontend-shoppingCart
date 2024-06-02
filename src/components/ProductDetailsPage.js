import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../action/productslugaction';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';
import { addToCart } from '../action/cartaction';
import RelatedProducts from './RelatedProducts';
import { clearProduct } from '../action/relatedproductclear';
import { getRelatedProducts } from '../action/productaction';
import ProductReviews from './ProductReviews';
import ReviewForm from './ReviewForm';
import { createReviewProduct, getAllReviews } from '../action/review';
import Star from './Star';
import EndDetail from './EndDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addWishlistItem, fetchWishlist } from '../action/wishlistaction';

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const productDetails = useSelector((state) => state.productdetails);
  const relatedproducts = useSelector((state) => state.relatedProduct);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = useSelector((state) => state.auth);
  const rolecheck = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    dispatch(getProductById(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    if (productDetails.product && productDetails.product.productPictures.length > 0) {
      setSelectedImage(productDetails.product.productPictures[0].img);
    }
  }, [productDetails.product]);

  const fetchRelatedProducts = async () => {
    try {
      setRelatedProductsLoading(true);
      dispatch(clearProduct());
      dispatch(getRelatedProducts(productDetails.product.category._id));
      setRelatedProductsLoading(false);
    } catch (error) {
      console.error('Error fetching related products:', error);
      setRelatedProductsLoading(false);
    }
  };

  useEffect(() => {
    if (productDetails.product && productDetails.product.category) {
      fetchRelatedProducts();
    }
  }, [productDetails.product]);

  const handleAddToCart = () => {
    if (productDetails.product) {
      const { _id, name, price, productPictures } = productDetails.product;
      dispatch(addToCart({ _id, name, price, productPictures }));
      toast.success("Product added to cart successfully!");
      navigate('/cart');
      
    } else {
      console.error('Product details are not available');
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
const handleAddWishlist=()=>{
  if (productDetails.product) {
    const { _id } = productDetails.product;
    dispatch(addWishlistItem({ _id}));
    dispatch(fetchWishlist());
    toast.success("Product added to cart successfully!");

   

  } else {
    console.error('Product details are not available');
  }

}
  if (!productDetails.product) {
    return <p>Loading...</p>;
  }

  const { name, price, description } = productDetails.product;

  const handleReviewSubmit = async (reviewData) => {
    try {
      dispatch(createReviewProduct(reviewData));
      setTimeout(() => {
        dispatch(getAllReviews(productDetails.product._id));
      }, 700);
      console.log('Submitting review:', reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <div className="product-details-container">
        <div className="product-images-container">
          {selectedImage && (
            <img src={selectedImage} alt={`Product ${name}`} className="main-image" />
          )}
          <div className="thumbnail-images-container">
            {productDetails.product.productPictures.map((picture) => (
              <img
                key={picture._id}
                src={picture.img}
                alt={`Product ${name}`}
                className="thumbnail-image"
                onClick={() => handleImageClick(picture.img)}
              />
            ))}
          </div>
        </div>
        <div className="product-details1">
          <h2>{name}</h2>
          <p style={{ fontWeight: "bold" }}>$ {price}</p>
          {productDetails.product && productDetails.product._id && (
            <Star rating={productDetails.averageRating} />
          )}
          <p className='des1'>{description}</p>

          <div className="action-buttons1">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="add-to-wishlist" onClick={handleAddWishlist}>Add to Wishlist</button>
          </div>
        </div>
      </div>

      <div>
        <ProductReviews style={{ marginLeft: "70px" }} productId={productDetails.product._id} />
        <ReviewForm productId={productDetails.product._id} onSubmit={handleReviewSubmit} />
      </div>

      <h3 className="nam" style={{color:'gray', marginLeft:'70px',fontSize:'30px',  fontWeight:'600px', WebkitTextStroke: '1.5px black'}}>Related Products</h3>
      {!relatedProductsLoading &&
        relatedproducts.relatedProducts &&
        relatedproducts.relatedProducts.length > 0 && (
          <RelatedProducts
            relatedProducts={relatedproducts.relatedProducts}
            currentProductId={productDetails.product._id}
            handleAddToCart={handleAddToCart}
          />
        )}
      <EndDetail />
      <ToastContainer position="top-end" />
    </>
  );
}

export default ProductDetailsPage;
