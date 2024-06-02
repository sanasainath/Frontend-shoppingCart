// Home.js
import React, { useEffect } from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import SideView from './SideView';

import FeaturedProducts from './FeaturedProducts';
import { useDispatch ,useSelector} from 'react-redux';
import RatingProducts from './RatingProducts';

import EndDetail from './EndDetail';
import { FETCH_WISHLIST } from '../action/constants';
function Home() {

 
  // const orders=()=>{
  //   dispatch(getAllProducts());
  // }
  return (
    <div className='home-page'>
      <div className='image-first'>
        <img src='./images/person-people-girl-woman-hair-white-588481-pxhere.com_ (1).jpg' alt='not found' />
      </div>
      <div className='product-zone'>
        <Sidebar />
        <SideView />
      </div>
   
      <div  className='ddd'> 
    
<FeaturedProducts/>

</div>
<div className='dddd'>
<RatingProducts/>
</div>
<EndDetail/>

     
    </div>
  );
}

export default Home;
