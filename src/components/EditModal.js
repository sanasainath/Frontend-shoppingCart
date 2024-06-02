
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, getAllProducts } from '../action/admin/productalltypes';
import './EditModal.css'; // Import your CSS file for styling

const EditModal = ({ isOpen, closeModal, selectedProductDetails, categories }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    isFeatured: false,
    category: '',
    rating: 0,
    productPictures: [], // Add category field to the formData
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedProductDetails && selectedProductDetails.length > 0) {
      const {
        name,
        description,
        price,
        quantity,
        isFeatured,
        category,
        rating,
        productPictures,
      } = selectedProductDetails[0];
      setFormData({
        name,
        description,
        price,
        quantity,
        isFeatured,
        category: category._id,
        rating,
        productPictures: productPictures || [],
      });
    }
  }, [selectedProductDetails]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'rating' ? parseFloat(value) : value,
    });
  };

  const handleAddImage = () => {
    if (image) {
      setFormData({
        ...formData,
        productPictures: [...formData.productPictures, image],
      });
      setImage(null);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct(formData, selectedProductDetails[0]._id));
    dispatch(getAllProducts());
    closeModal();
  };

  if (!isOpen || !selectedProductDetails || !categories) return null;

  return (
    <div className={`custom-edit-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-container">
        <div style={{display:'flex',gap:'120px'}}>
        <h3 style={{color:'tan',fontSize:'23px',margin:'0px'}}>Edit Product</h3>
        <button onClick={closeModal} className="close-btn">
          &times;
        </button>
        </div>
   
       
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Add Image:</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />
            <button style={{margin:'8px 0'}} type="button" onClick={handleAddImage}>
              Add Image
            </button>
          </div>
          <div>
            {formData.productPictures.map((pic, index) => (
              <div key={index} className="picture-preview">
                {pic instanceof Blob ? (
                  <img src={URL.createObjectURL(pic)} alt={`Product ${index + 1}`} />
                ) : (
                  <img src={pic.url} alt={`Product ${index + 1}`} />
                )}
              </div>
            ))}
          </div>
          <div style={{paddingBottom:'8px'}}>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {renderCategoryOptions(categories)}
            </select>
          </div>
          <div style={{display:'flex',gap:'10px',marginTop:'5px'}}>
            <label  htmlFor="isFeatured">Is Featured:</label>
            <input 
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={closeModal} className="cancel-btn">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const renderCategoryOptions = (categories, level = 0) => {
  if (!categories || categories.length === 0) return null;

  return categories.map((category) => (
    <React.Fragment key={category._id}>
      <option value={category._id}>{`${'—'.repeat(level)}${category.name}`}</option>
      {category.children && renderCategoryOptions(category.children, level + 1)}
    </React.Fragment>
  ));
};

export default EditModal;