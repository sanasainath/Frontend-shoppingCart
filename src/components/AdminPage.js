import React from 'react';
import { Link } from 'react-router-dom';
import NewPage from './NewPage';
import './AdminPage.css';

function AdminPage() {
  return (
    <div className="admin-page">
      <h1 className="admin-header">This is Admin Page</h1>
      <div className="admin-navigation">
        <Link to="category" className="nav-link">
          <p>Category</p>
        </Link>
        <Link to="product" className="nav-link">
          <p>Product</p>
        </Link>
        <Link to="page" className="nav-link">
      
          <NewPage />
        </Link>
        <Link to="admin/order" className="nav-link">
          <p>Admin Order</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
