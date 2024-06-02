// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { getProductsBySlug } from '../action/productslugaction';
// import './ProductListPage.css';
// import { generatePublicUrl } from '../urlConfig';

// function ProductListPage(props) {
//   const product = useSelector((state) => state.productslugretrieve);
//   const dispatch = useDispatch();
//   const { slug } = useParams();
//   const [range, setrange] = useState({
//     under5k: 5000,
//     under10k: 10000,
//     under15k: 15000,
//     under20k: 20000,
//     above20k: 90000,
//   });

//   const initialProductCount = 7; // Number of products to display initially
//   const [displayedProducts, setDisplayedProducts] = useState(initialProductCount);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     dispatch(getProductsBySlug(slug));
//   }, [dispatch, slug]);

//   const handleViewAllClick = () => {
//     // Show all products when "View All" is clicked
//     setDisplayedProducts(product.productsByPrice[slug]?.length || initialProductCount);

//     // Scroll to the end of the container smoothly
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTo({
//         left: scrollContainerRef.current.scrollWidth,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <div>
//       {Object.keys(product.productsByPrice).length > 0 &&
//         Object.keys(product.productsByPrice).map((key, index) => (
//           <div className="card0" key={index}>
//             <div className="container0">
//               <div>{slug} mobiles under {range[key]} </div>
//               <button onClick={handleViewAllClick}>View All</button>
//             </div>
//             <div className="horizontal-scroll-container0" ref={scrollContainerRef}>
//               {product.productsByPrice[key].slice(0, displayedProducts).map((productItem) => (
//                 <Link style={{ textDecoration: 'none' }} to={`/${productItem.slug}/${productItem._id}`} key={productItem._id}>
//                   <div className="product-container21">
//                     <div className="product-img0">
//                       <img src={generatePublicUrl(productItem.productPictures[0].img)} alt="" />
//                     </div>
//                     <div className="product-info0">
//                       <div className="product-name0">
//                         {productItem.name}
//                       </div>
//                       <div className="product-rating0">
//                         <span className="rating-star0">⭐</span>
//                         <span>4.3</span>&nbsp;
//                         <span className="rating-count0">(3342)</span>
//                       </div>
//                       <div className="product-price0">
//                         ₹{productItem.price}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default ProductListPage;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProductsBySlug } from '../action/productslugaction';
import './ProductListPage.css';
import { generatePublicUrl } from '../urlConfig';

function ProductListPage(props) {
  const product = useSelector((state) => state.productslugretrieve);
  console.log("check list of pridct oneeeeeeeeeeee", product);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [range, setrange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    above20k: 7000,
  });

  const initialProductCount = 7; // Number of products to display initially
  const [displayedProducts, setDisplayedProducts] = useState(initialProductCount);

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, [dispatch, slug]);

  const handleViewAllClick = () => {
    // Show all products when "View All" is clicked
    setDisplayedProducts(product.productsByPrice.length);
  };

  return (
    <div>
      {Object.keys(product.productsByPrice).length > 0 &&
        Object.keys(product.productsByPrice).map((key, index) => (
          <div className="card0" key={index}>
            <div className="container0">
              <div>{slug} mobiles under {range[key]} </div>
              <button onClick={handleViewAllClick} >View All</button>
            </div>
            <div className="horizontal-scroll-container0">
              {product.productsByPrice[key].slice(0, displayedProducts).map((productItem) => (
                <Link style={{ textDecoration: 'none' }} to={`/${productItem.slug}/${productItem._id}`} key={productItem._id}>
                  <div className="product-container21">
                    <div className="product-img0">
                      <img src={generatePublicUrl(productItem.productPictures[0].img)} alt="" />
                    </div>
                    <div className="product-info0">
                      <div className="product-name0">
                        {productItem.name}
                      </div>
                      <div className="product-rating0">
                        <span className="rating-star0">⭐</span>
                        <span>4.3</span>&nbsp;
                        <span className="rating-count0">(3342)</span>
                      </div>
                      <div className="product-price0">
                        ₹{productItem.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductListPage;
