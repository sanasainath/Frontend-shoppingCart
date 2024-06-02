import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductPage } from '../action/pageget';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './StoreProduct.css';

const layouts = [
  'banner-top-products-bottom',
  'banner-bottom-products-top',
  'banner-left-products-right',
  'banner-right-products-left'
];

function StoreProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { page } = useSelector(state => state.getpage);
  const [layout, setLayout] = useState(layouts[0]);

  useEffect(() => {
    if (location && location.search) {
      const params = new URLSearchParams(location.search);
      const cid = params.get('cid');
      const type = params.get('type');

      const payload = {
        cid,
        type,
      };

      dispatch(getProductPage(payload));
    }

    // Randomly select a layout configuration
    setLayout(layouts[Math.floor(Math.random() * layouts.length)]);
  }, [dispatch, location]);

  const renderLayout = () => {
    switch (layout) {
      case 'banner-top-products-bottom':
        return (
          <>
            {renderBanner()}
            {renderProducts()}
          </>
        );
      case 'banner-bottom-products-top':
        return (
          <>
            {renderProducts()}
            {renderBanner()}
          </>
        );
      case 'banner-left-products-right':
        return (
          <div className="side-by-side-container">
            {renderBanner()}
            {renderProducts()}
          </div>
        );
      case 'banner-right-products-left':
        return (
          <div className="side-by-side-container">
            {renderProducts()}
            {renderBanner()}
          </div>
        );
      default:
        return (
          <>
            {renderBanner()}
            {renderProducts()}
          </>
        );
    }
  };

  const renderBanner = () => (
    <div className="carousel-container">
      <h1 style={{ color: 'teal', fontSize: '30px', fontWeight: '500' }}>{page.title}</h1>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={true}
        interval={3000}
        emulateTouch={true}
        swipeable={true}
        stopOnHover={true}
        dynamicHeight={true}
      >
        {page.banner &&
          Array.isArray(page.banner) &&
          page.banner.map((bannerItem, index) => (
            <div key={index} className="banner-slide">
              <a href={bannerItem.navigateTo} rel="noopener noreferrer">
                <img src={bannerItem.img} alt={`Banner Slide ${index + 1}`} />
              </a>
              <p>{bannerItem.description}</p>
            </div>
          ))}
      </Carousel>
      <p style={{padding:'100px',fontWeight:'400',fontSize:'25px',color:'tan'}}>{page.description}</p>
    </div>
  );

  const renderProducts = () => (
    <div className="product-section12">
      <div className="product-container19">
        {page.product &&
          Array.isArray(page.product) &&
          page.product.map((productItem, index) => (
            <Link to={`/${productItem.slug}/${productItem._id}`} style={{ textDecoration: 'none' }} key={index}>
              <div className="product-item">
                <img src={productItem.img} alt={`Product ${index + 1}`} />
                <div className="product-infofo">
                  <p className="product-named">{productItem.name}</p>
                  <p className="product-descriptiond">{productItem.description}</p>
                  <p className="product-priced">Price: ${productItem.price}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );

  return (
    <div className={`page-main-containers ${layout}`}>
      {renderLayout()}
    </div>
  );
}

export default StoreProduct;