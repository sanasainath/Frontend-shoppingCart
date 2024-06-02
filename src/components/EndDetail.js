import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import './EndDetails.css'

const EndDetail = () => {
  return (
    <div className="end-detail-container">
      <div className="additional-contenttt">
        <div className="company-info">
          <div className='logo-one'>

         
          <img
            src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/site-logo.png'
            className='header-imageee'
            alt='not found'
          />
          <h2>ShoppingCart</h2>
          </div>
          <p>This is the shopping cart where we can buy products like clothes, mobiles, groceries, etc.</p>
        </div>
        <div className='contact-infooo'>
          <h2>Shop Location</h2>
          <p>
            <FmdGoodIcon className="icon" />
            Themefreesia, Abc Building, 5th floor, Zyz Street
          </p>
          <p>
            <CallIcon className="icon" />
            (123) 456-7890
          </p>
          <p>
            <EmailIcon className="icon" />
            support@support.com Themefreesia
          </p>
        </div>
      </div>

      <div className='social-icons'>
        <FacebookOutlinedIcon className="social-icon" />
        <TwitterIcon className="social-icon" />
        <GoogleIcon className="social-icon" />
        <PinterestIcon className="social-icon" />
        <LanguageIcon className="social-icon" />
        <InstagramIcon className="social-icon" />
        <SportsVolleyballIcon className="social-icon" />
        <LinkedInIcon className="social-icon" />
      </div>
    </div>
  );
}

export default EndDetail;
