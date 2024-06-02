import React, { useState } from 'react';
import axios from 'axios';
// import './CreateBlog.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, content, author, tags: tags.split(',').map(tag => tag.trim()) };

    fetch('https://backend-shoppingcart-rfe7.onrender.com/api/post/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(blog) // Changed body parameter from `body` to `blog`
        })
        .then(response => {
            if (response.ok) {
                console.log('Blog post created successfully');
                // Optionally, reset form fields
                setTitle('');
                setContent('');
                setAuthor('');
                setTags('');
            } else {
                console.error('Failed to create blog post');
            }
        })
        .catch(error => console.error('Error creating blog post:', error));
};


  return (
    <div className="create-blog" style={{paddingLeft:'10px'}}>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated):</label>
          <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type="submit"  className="submit-btn">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;
