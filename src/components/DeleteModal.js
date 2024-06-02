import React from 'react';
import './DeleteModal.css'; // Import your CSS file for styling

const DeleteModal = ({ isOpen, closeModal, selectedProducts, deleteProduct }) => {
  return (
    <div className={`custom-delete-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-container">
        <div style={{display:'flex',gap:'100px'}}> 

       
      <h3 style={{color:'teal',fontWeight:'800px',fontSize:'20px'}}>Delete Product</h3>
        <button onClick={closeModal} className="close-btn">
          &times;
        </button>
        </div>
      
        <div className="modal-body">
          <p>Selected Products:</p>
          <ul>
            {selectedProducts.map((productId) => (
              <li key={productId}>{productId}</li>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button id="cancelBtn" onClick={closeModal}>
            Cancel
          </button>
          <button onClick={deleteProduct}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
