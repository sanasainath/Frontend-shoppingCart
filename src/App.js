import React, { useState, useEffect } from 'react'; // Include useEffect here
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import WishList from './components/WishList';
import Navigation from './components/Navigation';
import { BreadcrumbProvider } from './components/BreadcrumbContext'; 
import FlipSign from './components/FlipSign';
import FlipSignUp from './components/FlipSignUp';
import PrivateRoutes from './PrivateRoutes'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux'; // No need to import useEffect again here
import { UserLogin } from './action/authaction';
import Category from './components/Category';
import ProductDetailsPage from './components/ProductDetailsPage'
import Product from './components/Product'
import { getAllCategories } from './action/categoryaction';
import { getInitialData } from './action/initialaction'
import Realme from './components/Realme'
import TotalProductPages from './components/TotalProductPages';
import NewPag from './components/NewPage'
import ProductListPage from './components/ProductListPage';
import CartPage from './components/CartPage'
import { getCartItems, updateCart } from './action/cartaction';
import CheckOut from './components/CheckOut';
import SearchResults from './components/SearchResults';
import OrdersPlaced from './components/OrdersPlaced';
import AdminSignUp from './components/admin/AdminSignUp';
import AdminSignin from './components/admin/AdminSignin';
import AdminOrdering from './components/AdminOrdering';
import Contact from './components/Contact'
import AdminPage from './components/AdminPage'
import Blog from './components/Blog';
import ShopHead from './components/ShopHead';
import OrderPayment from './components/OrderPayment';
import CreateBlog from './components/CreateBlog';
import BlogPost from './components/BlogPost';
import BlogList from './components/BlogList';
import { jwtDecode } from 'jwt-decode';

function App() {
  const dispatch=useDispatch();
  const auth= useSelector((state) => state.auth);
  // const navigate = useNavigate();
  console.log("auuuuuuuuuuuuuuuuu",auth)
  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    console.log("expiredddddddddddddddddddddddddddataaaaaaaaaaaaaaaaeeeeeeeeeeeeeee",exp)
    return exp < Date.now() / 1000;
};
  useEffect(()=>{
    if(isTokenExpired(auth.token))
      {

      }

  },[]);  
  
  useEffect(() => {
    if(!auth.authenticate) {
      dispatch(UserLogin());
      // navigate('/signin');
    }

    if(auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate, dispatch]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Router>
       
          
    

          <Routes>
          <Route path="/signup" element={<FlipSignUp />} />
          <Route path="/signin" element={<FlipSign />} />
          <Route
            element={
              <div>
                <Header />
                <Navigation />
                <PrivateRoutes />
              </div>
            }
          >
              <Route path="/" element={<Home />} exact />
              <Route path="wishlist" element={<WishList />} exact />
              <Route path='/admin/signin/admin/change/product' element={<Product/>}/>
              <Route path='/admin/signin/admin/change/category' element={<Category/>}/>
              <Route path='/admin/signin/admin/change/page' element={<NewPag/>}/> 
              <Route path="/cart" element={<CartPage />} exact />
              <Route path="/shop" element={<ShopHead  />} exact/>
           
           <Route path="/blog" element={<Blog />} exact />
           <Route path="/order/pay" element={<OrderPayment />} exact/>
           <Route path="/admin/signin/admin/change" element={<AdminPage/>}exact />
           <Route path="/admin/signin/admin/change/admin/order" element={<AdminOrdering />} exact />
           <Route path="/ordersplaced" element={<OrdersPlaced/>}exact />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/:slug/:_id" element={<ProductDetailsPage/>}exact />
           <Route path='/:slug' element={<TotalProductPages />} exact/>
           <Route path='/checkout' element={<CheckOut />} exact/>
           <Route path="/searchResults/:searchQuery" element={<SearchResults />}exact />
           <Route  path="/blog" element={<BlogList/>} exact/>
            <Route path="/postblog/:id" element={<BlogPost/>} exact/>
            <Route path="/create" element={<CreateBlog/>} exact/>
            
           
            {/* Exclude Header and Navigation from these routes */}
            {/* <Route path="/signup" element={<FlipSignUp />} />
            <Route path="/signin" element={<FlipSign />} /> */}
            {/* <Route path="/admin/signup" element={<AdminSignUp/>} />
            <Route path="/admin/signin" element={<AdminSignin/>} /> */}
            </Route>
           
          </Routes>
     
      </Router>
    </div>
  );
}

export default App;

