import React from 'react';
import './ForHome.css'; // Add any specific styles for the modal
import { useNavigate } from 'react-router-dom';

const ForHome = ({ closeModal }) => {
  const navigate = useNavigate();

  const gotoShopping = () => {
    navigate('/shop');
    closeModal(); // Close the modal when navigating
  };

  return (
    <div className="hover-modal">
      <div style={{ textAlign: 'center', display: 'flex' }}>
        <img
          src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/site-logo.png'
          width="60px"
          className='header-image'
          alt='not found'
        />
        <h3>Shopping Cart</h3>
      </div>
      <p>
        A shopping cart, also known as a trolley or buggy, is an essential component in both physical and online retail environments, designed to enhance the shopping experience by providing convenience and efficiency. In physical stores, shopping carts are typically made of metal or heavy-duty plastic, featuring a large basket for items, a handlebar for pushing, and wheels for easy navigation through aisles. Some models include additional features such as child seats, safety harnesses, and lower shelves for bulkier items. In online shopping, a virtual cart allows customers to select and store items while they continue browsing.
      </p>
      <button className='detn' onClick={gotoShopping}>Start Shopping..</button>
    </div>
  );
};

export default ForHome;
