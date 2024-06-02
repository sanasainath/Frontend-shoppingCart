import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminAllOrders, getOrder, updateOrderStatus } from '../action/addressaction';
import './AdminOrdering.css'
function AdminOrdering() {
  const dispatch = useDispatch();
  const orderss = useSelector((state) => state.address.adminOrders);

  // console.log("orders checklllllllllllllllllllllllllllll",orderss);
  // const auth = useSelector((state) => state.auth);

  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handleStatusChange = (orderId, event) => {
    setSelectedStatusMap((prevMap) => ({
      ...prevMap,
      [orderId]: event.target.value,
    }));
  };

  const handleUpdateStatus = (orderId) => {
    const selectedStatus = selectedStatusMap[orderId];

    if (orderId && selectedStatus) {
      // dispatch(updateOrderStatus(auth.user._id, orderId, selectedStatus));
          dispatch(updateOrderStatus(orderId, selectedStatus));
      dispatch(getAdminAllOrders());
    }
  };

  useEffect(() => {
    dispatch(getAdminAllOrders());
  }, [dispatch]);

  return (
    <div className="admin-order-container">
      <h2 style={{fontSize:'28px',textAlign:"center",color:'thistle',fontWeight:'lighter'}}>Orders Placed</h2>
      {orderss.map((order) => (
        <div key={order._id} className="order-card">
          
          <div className="order-details">
  <h3>Order ID: {order._id}</h3>
  <p className="order-date">Ordered Date: {formatDate(order.OrderedDate)}</p>
            <p className="order-time">Ordered Time: {formatTime(order.OrderedDate)}</p>
  <p>Payment Status: {order.paymentStatus}</p>
  <p>Order Status:</p>
  <ul className="order-status-list">
    {order.orderStatus.map((status) => (
      <li
        key={status.type}
        className={`order-status-item ${status.isCompleted ? 'completed' : 'pending'}`}
      >
        {status.type}: {status.isCompleted ? 'Completed' : 'Pending'}
      </li>
    ))}
  </ul>
</div>
          <ul className="product-list">
            {order.items.map((item) => (
              <li key={item._id} className="product-item">
                <div className="product-info">
                  <p className="product-name">{item.productId.name}</p>
                  <p className="product-price">Payable Price: ${item.payablePrice}</p>
                </div>
                {item.productId.productPictures.length > 0 && (
                  <img
                    src={item.productId.productPictures[0].img}
                    alt={item.productId.name}
                    className="product-image"
                  />
                )}
              </li>
            ))}
          </ul>
          <div className="order-actions">
            <select
              className="status-select"
              value={selectedStatusMap[order._id] || ''}
              onChange={(e) => handleStatusChange(order._id, e)}
            >
              <option value="">Select Order Status</option>
              <option value="ordered">Ordered</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <button className="update-button" onClick={() => handleUpdateStatus(order._id)}>
              Update Order Status
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrdering