// Subcategory.js
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Sidebar.css';

function Subcategory({ name, slug, id, type, children }) {
  const [isClicked, setClicked] = useState(false);

  const handleClick = (event) => {
    if (children.length === 0) {
      return;
    }
    event.preventDefault();
    setClicked(!isClicked);
  };

  return (
    <div className={`subcategory ${isClicked ? 'clicked' : ''}`}>
      <div className='subcategory-item'>
        <a
          href={`/${slug}?cid=${id}${type !== undefined && type !== '' ? `&type=${type}` : '&type=undefined'}`}
          className='subcategory-link'
          onClick={handleClick}
        >
          {name}
        </a>
        {children.length > 0 && (
          <ArrowForwardIosIcon style={{ fontSize: '10px', color: '#28282B', alignItems: 'center', marginLeft: '12px', marginTop: '5px' }} />
        )}
      </div>
      {isClicked && children.length > 0 && (
        <div className='subcategories'>
          {children.map(subcategory => (
            <Subcategory key={subcategory._id} id={subcategory._id} {...subcategory} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Subcategory;
