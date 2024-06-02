import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../action/categoryaction';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import './MobileSidebar.css';

function MobileSubcategory({ name, slug, id, type, children }) {
  const [isClicked, setClicked] = useState(false);

  const handleClick = (event) => {
    if (children.length === 0) {
      return;
    }
    event.preventDefault();
    setClicked(!isClicked);
  };

  return (
    <div className={`mobile-subcategory ${isClicked ? 'clicked' : ''}`}>
      <div className='mobile-subcategory-item'>
        <a
          href={`/${slug}?cid=${id}${type !== undefined && type !== '' ? `&type=${type}` : '&type=undefined'}`}
          className='mobile-subcategory-link'
          onClick={handleClick}
        >
          {name}
        </a>
        {children.length > 0 && (
          <ArrowForwardIosIcon className={`arrow-icon ${isClicked ? 'rotate' : ''}`} />
        )}
      </div>
      {isClicked && children.length > 0 && (
        <div className='mobile-subcategories'>
          {children.map(subcategory => (
            <MobileSubcategory key={subcategory._id} id={subcategory._id} {...subcategory} />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMainCategory({ category }) {
  const { name, slug, _id, type, children } = category;
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!isClicked);
  };

  return (
    <div className={`mobile-main-category ${isClicked ? 'clicked' : ''}`}>
      <div className='mobile-category-item' onClick={handleClick}>
        <span className='mobile-main-category-link'>{name}</span>
        {children.length > 0 && (
          <ArrowForwardIosIcon className={`arrow-icon ${isClicked ? 'rotate' : ''}`} />
        )}
      </div>
      {isClicked && (
        <div className='mobile-subcategories'>
          {children.map(subcategory => (
            <MobileSubcategory key={subcategory._id} id={subcategory._id} {...subcategory} />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSidebar({ isOpen, toggleSidebar }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
      <div className='mobile-sidebar-content'>
        <div className='mobile-close-button' onClick={toggleSidebar}>
          <CloseIcon />
        </div>
        <div className='mobile-sidebar-top'>
          <div className='mobile-side1'>
            <h2 className='mobile-sidebar-header'>All Products</h2>
          </div>
          <div className='mobile-category-info'>
            {categories.length > 0 &&
              categories.map(category => (
                <MobileMainCategory key={category._id} category={category} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
