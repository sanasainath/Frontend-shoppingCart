import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://backend-shoppingcart-rfe7.onrender.com/api/get/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchBlogs();
  }, []);

  if (loading) { // Show loading message while data is being fetched
    return <p style={{color:'pink',fontSize:'30px'}}>Loading blogs...</p>;
  }

  return (
    <div className="blog-list">
      <h2>All Blogs</h2>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/postblog/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
