// BlogPost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://backend-shoppingcart-rfe7.onrender.com/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <div className="blog-post">
      <h2 className="title">{blog.title}</h2>
      <p className="author">Written by {blog.author}</p>
      <div className="content">{blog.content}</div>
    </div>
  );
}

export default BlogPost;
