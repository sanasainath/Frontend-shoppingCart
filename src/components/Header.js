import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search as SearchIcon,
  FmdGood as FmdGoodIcon,
  Call as CallIcon,
  Email as EmailIcon,
  Twitter as TwitterIcon,
  FacebookOutlined as FacebookOutlinedIcon,
  Google as GoogleIcon,
  Pinterest as PinterestIcon,
  Instagram as InstagramIcon,
  SportsVolleyball as SportsVolleyballIcon,
  LinkedIn as LinkedInIcon,
  Person4 as Person4Icon,
  LockOpen as LockOpenIcon,
  Language as LanguageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { signout } from '../action/authaction';
import { searchProducts } from '../action/productaction';
import './Header.css';
import { fetchWishlist } from '../action/wishlistaction';

function Header() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [showUserSections, setShowUserSections] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isAuthenticated = useSelector((state) => state.auth.authenticate);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rolecheck = useSelector((state) => state.auth.user?.role);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const handleLoginClick = () => {
    if (!isAuthenticated && auth && auth.user) {
      navigate('/signin');
    }
  };

  const handleSignoutClick = () => {
    dispatch(signout());
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleUserSections = () => {
    setShowUserSections(!showUserSections);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      dispatch(searchProducts(searchQuery));
      navigate(`/searchResults/${searchQuery}`);
    } else {
      console.error('Search query is empty.');
    }
  };
  useEffect(() => {
    dispatch(fetchWishlist());
    
  }, [dispatch]); 

  const wishlist = useSelector((state) => state.wishlist.wishItems?.wishItems || []);
  console.log("wish lennnngth", wishlist.length);
  const totalSum = Object.values(cartItems || {}).reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const numberOfProducts = Object.keys(cartItems || {}).length;

  return (
    <div className='header-top'>
      <div className='addresss'>
        <div className='headerss'>
          <FmdGoodIcon className='icon' style={{ fontSize: '17px' }} />
          Themefreesia, Abc Building, 5th floor, Zyz Street
          <CallIcon className='icon' style={{ fontSize: '17px', paddingLeft: '6px' }} />
          (123)456-7890
          <EmailIcon className='icon' style={{ fontSize: '17px', paddingLeft: '6px' }} />
          support@support.com Themefreesia
        </div>
        <div className='changing'>
          <div className='allicons'>
            <FacebookOutlinedIcon className='icon1' style={{ fontSize: '18px' }} />
            <TwitterIcon className='icon1' style={{ fontSize: '18px' }} />
            <GoogleIcon className='icon1' style={{ fontSize: '18px' }} />
            <PinterestIcon className='icon1' style={{ fontSize: '18px' }} />
            <LanguageIcon className='icon1' style={{ fontSize: '18px' }} />
            <InstagramIcon className='icon1' style={{ fontSize: '18px' }} />
            <SportsVolleyballIcon className='icon1' style={{ fontSize: '18px' }} />
            <LinkedInIcon className='icon1' style={{ fontSize: '20px' }} />
          </div>
          {windowWidth <= 768 && (
            <div className='sidebar-buttonnn' onClick={toggleUserSections}>
              <h3>MENU</h3> {showUserSections ? <CloseIcon className="pointer" /> : <span className="pointer">☰</span>}
            </div>
          )}
          {(showUserSections || windowWidth > 768) && (
            <div className='user-sections'>
              {rolecheck === 'admin' && (
                <div className='account-user'>
                  <Person4Icon className='icon' style={{ cursor: 'pointer', fontSize: '20px' }} />
                  <Link to="/admin/signin/admin/change">Admin</Link>
                </div>
              )}
              {rolecheck === 'user' && (
                <div className='account-user' style={{ cursor: 'pointer', fontSize: '20px' }}>
                  <Person4Icon className='icon' />
                  <Link to="/ordersplaced" style={{ fontSize: '16.5px' }}>Orders</Link>
                </div>
              )}
              {isAuthenticated ? (
                <div className='login-user' onClick={handleSignoutClick} style={{ cursor: 'pointer' }}>
                  <LockOpenIcon className='icon' style={{ cursor: 'pointer', fontSize: '20px' }} />
                  <p>Signout</p>
                </div>
              ) : (
                <Link to='signin'>
                  <div className='login-user' onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                    <LockOpenIcon className='icon' style={{ fontSize: '20px' }} />
                    <p>Login</p>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {windowWidth > 788 && (
        <div className='header-start'>
          <div className='header-name'>
            <img
              src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/site-logo.png'
              width="60px"
              className='header-image'
              alt='not found'
            />
            <div className='text-container111'>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <h1>Shopping Cart</h1>
                <p>BUILD YOUR OWN ONLINE STORE</p>
              </Link>
            </div>
          </div>
          <div className='header-search'>
            <input
              type="search"
              className="search-one"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="search-icon-wrapper" onClick={handleSearch}>
            <SearchIcon className="search-icon" />
          </div>
          <div className='love'>
            <Link to='wishlist'>
              <img src='/images/icons8-heart-100 (1).png' alt='not found' style={{
                fontWeight: 'bolder', width: '35px', height: '30px',
                WebkitTextStroke: '1px black'
              }} />
              <p>{wishlist.length}</p>
            </Link>
          </div>
          <div className='love1'>
            <Link to='cart'>
              <img src='/images/icons8-basket-24.png' style={{ width: '28px', height: '25px' }} alt='not found' />
              <p>{numberOfProducts}</p>
            </Link>
          </div>
          <div className='love2'>
            <p style={{ fontSize: '20px', color: 'gray' }}>Total</p>
            <p style={{ fontSize: '20px', color: 'gray' }}>${totalSum.toFixed(2)}</p>
          </div>
        </div>
      )}

      {windowWidth <= 788 && (
        <div className='header-start'>
          <div className='header-name'>
            <img
              src='https://demo.themefreesia.com/shoppingcart/wp-content/uploads/sites/47/2019/03/site-logo.png'
              width="60px"
              className='header-image'
              alt='not found'
            />
            <div className='text-container111'>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <h1>Shopping Cart</h1>
                <p>BUILD YOUR OWN ONLINE STORE</p>
              </Link>
            </div>
          </div>
          <div className='for-rows'>
              <div className='for-rows1'>
                <div className='header-search'>
                  <input
                    type="search"
                    className="search-one"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="search-icon-wrapper" onClick={handleSearch}>
                  <SearchIcon   style={{cursor:'pointer'}} className="search-icon" />
                </div>
              </div>
            <div className='for-row3'>
              <div className='love'>
                <Link to='wishlist'>
                  <img src='/images/icons8-heart-100 (1).png' alt='not found' style={{
                    fontWeight: 'bolder', width: '35px', height: '30px',
                    WebkitTextStroke: '1px black'
                  }} />
                  <p>{wishlist.length}</p>
                </Link>
              </div>
              <div className='love1'>
                <Link to='cart'>
                  <img src='/images/icons8-basket-24.png' style={{ width: '28px', height: '25px' }} alt='not found' />
                  <p>{numberOfProducts}</p>
                </Link>
              </div>
              <div className='love2'>
                <p style={{ fontSize: '20px', color: 'gray' }}>Total</p>
                <p style={{ fontSize: '20px', color: 'gray' }}>${totalSum.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
