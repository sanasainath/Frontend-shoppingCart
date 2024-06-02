  import React, { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { getOrder } from '../action/addressaction';

  function OrdersPlaced() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.address.orders);
    // console.log("check orders", orders[0].OrderedDate);
  

    useEffect(() => {
      dispatch(getOrder());
    }, []);
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const formatTime = (dateString) => {
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    return (
      <div>
        <h2>Orders Placed</h2>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h3>Order ID: {order._id}</h3>
              <p className="order-date">Ordered Date: {formatDate(order.OrderedDate)}</p>
            <p className="order-time">Ordered Time: {formatTime(order.OrderedDate)}</p>
          
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Order Status:</p>
              <ul>
                {order.orderStatus.map((status) => (
                  <li
                    key={status.type}
                    style={{
                      color: status.isCompleted ? 'green' : 'red',
                      fontWeight: status.isCompleted ? 'bold' : 'normal',
                    }}
                  >
                    {status.type}: {status.isCompleted ? 'Completed' : 'Pending'}
                  </li>
                ))}
              </ul>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.productId && item.productId.name && item.productId.productPictures && (
                      <>
                        <p>Product: {item.productId.name}</p>
                        <p>Payable Price: ${item.payablePrice}</p>
                        {item.productId.productPictures.length > 0 && (
                          <img
                            src={item.productId.productPictures[0].img}
                            alt={item.productId.name}
                            style={{ width: '100px', height: '100px' }}
                          />
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No orders placed yet.</p>
        )}
      </div>
    );
  }

  export default OrdersPlaced;
