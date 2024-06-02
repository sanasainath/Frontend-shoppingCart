import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import './Navigation.css'; // Import the separate CSS file for the navigation bar styling
import MobileSidebar from './MobileSidebar'; // Import the MobileSidebar component
import ForHome from './ForHome';

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility
  const [showModal, setShowModal] = useState(false); // Add state for modal visibility

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setShowMenu(false);
        setShowSidebar(false); // Close sidebar when resizing to larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const closeDropdown = () => {
    setShowDropdown(false); // Close dropdown
  };

  const handleMouseEnter = () => {
    setShowModal(true); // Show modal on hover
  };

  const handleMouseLeave = () => {
    setShowModal(false); // Hide modal when not hovering
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <>
      {windowWidth <= 768 ? (
        <div className='mobile-header'>
          <h2 onClick={toggleSidebar} style={{ cursor: 'pointer', color: '#FF5F1F', fontWeight: '500', paddingLeft: '5px' }}>All Products</h2>
          <MobileSidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} />
          <div className='sidebar-button1' onClick={toggleMenu} style={{ cursor: 'pointer' }}>
            <h3 style={{ marginRight: '9px', fontWeight: 'bold' }}>MENU</h3>
            {showMenu ? <CloseIcon /> : '☰'}
          </div>
        </div>
      ) : null}
      {(showMenu || windowWidth > 768) && (
        <div className={`navigation-menu ${showMenu ? 'open' : ''}`}>
          <nav>
            <ul>
              <li
                className="dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='/images/icons8-home-50 (1).png' width='17px' alt='not found' />Home
                </Link>
                {showModal && <ForHome closeModal={closeModal} />} {/* Pass the closeModal function */}
              </li>
              <li className="dropdown">
                <span className='sec-sections' onClick={toggleDropdown} style={{ cursor: 'pointer', color: 'gray', fontWeight: 'normal', display: 'flex', alignItems: 'center', marginTop:'10px' }}>
                  <img src='/images/icons8-menu-24.png' width='17px' alt='not found' />Sections
                </span>
                {showDropdown && (
                  <div className="dropdown-content" style={{background:'#f5f5f5',}}>
                    <Link to="/contact" style={{ color: 'gray', fontWeight: 'normal' }} onClick={closeDropdown}>
                      <img src='/images/icons8-contact-48.png' width='17px' alt='not found' />Contact Us
                    </Link>
                    <Link to="/blog" style={{ color: 'gray', fontWeight: 'normal' }} onClick={closeDropdown}>
                      <img src='/images/icons8-blog-64.png' width='17px' alt='not found' />Blog
                    </Link>
                    <Link to="/shop" style={{ color: 'gray', fontWeight: 'normal' }} onClick={closeDropdown}>
                    💼 Shop 
                    </Link>
                    <Link to="/shop" style={{ color: 'gray', fontWeight: 'normal' }} onClick={closeDropdown}>
                      <img src='/images/icons8-cart-30.png' width='17px' alt='not found' />Cart
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <Link to="/shop" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='/images/icons8-cart-30.png' width='17px' alt='not found' />Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='/images/icons8-blog-64.png' width='17px' alt='not found' />Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'gray', fontWeight: 'normal' }}>
                  <img src='/images/icons8-contact-48.png' width='17px' alt='not found' />Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
