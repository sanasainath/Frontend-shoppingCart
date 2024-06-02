// Blog.js
import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';
import BlogList from './BlogList';

const Blog = () => {
  return (
    <nav className="navbar">
  
      <div className="content">
        <div className="blog-list">
          <BlogList/>
        </div>
        <div className="links">
         
          <Link to="/create" className="blog-link create-blog-link">Create Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default Blog;
