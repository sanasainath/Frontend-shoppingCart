import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '../action/admin/productalltypes';
import { addProduct } from '../action/productaction';
import './Product.css';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

function Product({ categories }) {
  const { AllProducts, loading, error } = useSelector((state) => state.getallproducts);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductsDetails, setSelectedProductsDetails] = useState([]);
  const [productDetailsModalOpen, setProductDetailsModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const toggleCheckbox = (productId) => {
    if (checked.includes(productId)) {
      setChecked(checked.filter((id) => id !== productId));
    } else {
      setChecked([...checked, productId]);
    }
  };

  const toggleExpand = (productId) => {
    if (expanded.includes(productId)) {
      setExpanded(expanded.filter((id) => id !== productId));
    } else {
      setExpanded([...expanded, productId]);
    }
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteProducts = async () => {
    await dispatch(deleteProduct(checked));
    dispatch(getAllProducts());
    setChecked([]);
    closeDeleteModal();
  };

  const handleProductDetails = () => {
    const product = AllProducts.products;
    if (!Array.isArray(product)) {
      console.error('AllProducts is not an array');
      return;
    }
    const selectedDetails = product.filter((product) => checked.includes(product._id));
    setSelectedProductDetails(selectedDetails);
    setProductDetailsModalOpen(true);
  };

  const renderProductTree = (allProducts) => {
    const { products } = allProducts;
  
    // Check if products is undefined or empty
    if (!products || products.length === 0) {
      return <div>No products found</div>;
    }
  
    // Define the number of products per row
    const productsPerRow = 3;
  
    // Chunk the products array into arrays of specified size (productsPerRow)
    const productRows = [];
    for (let i = 0; i < products.length; i += productsPerRow) {
      productRows.push(products.slice(i, i + productsPerRow));
    }
  
    return (
      <div className="product-grid">
        {productRows.map((row, index) => (
          <div key={index} className="product-row">
            {row.map((product) => (
              <div key={product._id} className="product-ite">
                <div className="product-info">
                  <input style={{cursor:'pointer'}}
                    type="checkbox"
                    checked={checked.includes(product._id)}
                    onChange={() => toggleCheckbox(product._id)}
                  />
                  <span onClick={() => toggleExpand(product._id)}>
                    {product.name}
                  </span>
                </div>
                {expanded.includes(product._id) && (
                  <div className="product-details">
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Ratings: {product.rating}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  
  const Modal = ({ setOpenModal, allCategories }) => {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [productCategoryId, setProductCategoryId] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    const saveProduct = () => {
      const form = new FormData();
      form.append('name', productName);
      form.append('isFeatured', isFeatured);
      form.append('description', productDescription);
      form.append('price', productPrice);
      form.append('quantity', productQuantity);
      form.append('category', productCategoryId);

      productPictures.forEach((file, index) => {
        form.append("productPictures", file);
      });

      dispatch(addProduct(form));
    };

    return (
      <div className="modal-background">
        <div className="modal-container">
          <div className="modal-header">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="modal-title">
            <h3>Add New Product</h3>
          </div>
          <div className="modal-body">
            <form encType="multipart/form-data" method="post" action="/product/create">
              <input
                type="text"
                value={productName}
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="text"
                value={productDescription}
                placeholder="Product Description"
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <input
                type="text"
                value={productPrice}
                placeholder="Product Price"
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <input
                type="text"
                value={productQuantity}
                placeholder="Product Quantity"
                onChange={(e) => setProductQuantity(e.target.value)}
              />
              <select value={productCategoryId} onChange={(e) => setProductCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {renderCategoryOptions(allCategories)}
              </select>
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <label htmlFor="isFeatured">Featured</label>
              <input
                type="file"
                name="productPictures"
                onChange={(e) => {
                  const filesArray = Array.from(e.target.files);
                  setProductPictures([...productPictures, ...filesArray]);
                }}
                multiple
              />
              {productPictures.length > 0 &&
                <div className="pictures-preview">
                  {productPictures.map((pic, index) => (
                    <div key={index} className="picture-preview">
                      <img src={URL.createObjectURL(pic)} alt={`Product ${index}`} />
                    </div>
                  ))}
                </div>
              }
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button onClick={saveProduct}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };

  const [openCategories, setOpenCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCategory = (categoryId) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };  const renderCategories = (categories, parentCategory = null) => {
    if (!categories || categories.length === 0) return null;

    return (
      <ul>
        {categories.map((category) => (
          <li style={{cursor:'pointer'}} key={category._id}>
            <span onClick={() => toggleCategory(category._id)}>
              {category.name}
            </span>
            {openCategories.includes(category._id) && (<ul style={{cursor:'pointer'}}>   {renderCategories(category.children, category._id)}</ul>)}
          </li>
        ))}
      </ul>
    );
  };



  // Helper function to render category options recursively
  const renderCategoryOptions = (categories, level = 0) => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <option value={category._id}>{`${'—'.repeat(level)}${category.name}`}</option>
        {category.children && renderCategoryOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  }; 

  return (
    <div className="product-container">
      <div className="category-section">
        <h3 className="category-title">Categories</h3>
        {renderCategories(categories)}
      </div>
      <div className="product-section">
        <h3 className="product-title">Products</h3>
        {renderProductTree(AllProducts)}
        <div className="actions">
          <button
            className="add-product-btn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create Product
          </button>
          <button className="delete-product-btn" onClick={openDeleteModal}>
            Delete Product
          </button>
          <button className="edit-product-btn" onClick={handleProductDetails}>
            Edit Product
          </button>
        </div>
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} allCategories={categories} />}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          closeModal={closeDeleteModal}
          selectedProducts={checked}
          deleteProduct={handleDeleteProducts}
        />
      )}
      <EditModal
        isOpen={productDetailsModalOpen}
        closeModal={() => setProductDetailsModalOpen(false)}
        selectedProductDetails={selectedProductDetails}
        categories={categories}
      />
    </div>
  );
}

const CategoryWrapper = () => {
  const categories = useSelector((state) => state.category.categories);
  return <Product categories={categories} />;
};


export default CategoryWrapper;



