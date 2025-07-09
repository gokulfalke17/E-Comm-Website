import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUser(localUser);
      fetchOrders(localUser);
    }

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const updatedUser = JSON.parse(e.newValue);
        setUser(updatedUser);
        fetchOrders(updatedUser);
      }

      if (e.key === 'orders_updated') {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        fetchOrders(currentUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (user?.id) fetchOrders(user);
  }, [user]);

  const fetchOrders = (currentUser) => {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter(
      (order) => order.userId === currentUser.id && !order.cancelled
    );
    setOrders(userOrders);
    setSelectedOrders([]);
  };

  const updateQuantity = (orderId, newQty) => {
    if (newQty < 1) return;

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId && order.userId === user?.id
        ? { ...order, quantity: newQty }
        : order
    );

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    fetchOrders(user);
  };

  const cancelOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId && order.userId === user?.id
        ? { ...order, cancelled: true }
        : order
    );

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    fetchOrders(user);
  };

  const toggleSelect = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const getTotal = () => {
    return orders
      .filter((order) => selectedOrders.includes(order.id))
      .reduce((sum, order) => {
        const price = Number(order?.product?.price || 0);
        const qty = Number(order?.quantity || 1);
        return sum + price * qty;
      }, 0);
  };

  return (
    <div className="container my-5">
      <style>{`
        .order-img-wrapper {
          height: 200px;
          overflow: hidden;
          background-color: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }
        .order-img {
          max-height: 100%;
          width: auto;
          object-fit: cover;
        }
        .btn-group-custom button {
          flex: 1;
          margin: 0 4px;
        }
        .form-check-input {
          width: 1.3em;
          height: 1.3em;
        }
      `}</style>

      <h3 className="mb-4 text-center text-primary fw-bold">My Orders</h3>
      <div className="row g-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card shadow-sm border-0 h-100 rounded-4">
                <div className="order-img-wrapper">
                  <img
                    src={order?.product?.image || 'https://via.placeholder.com/150'}
                    alt={order?.product?.name || 'Product'}
                    className="card-img-top order-img"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      id={`select-${order.id}`}
                    />
                    <label className="form-check-label" htmlFor={`select-${order.id}`}>
                      Select to Buy
                    </label>
                  </div>

                  <h5 className="card-title">{order.product?.name || 'Product Name'}</h5>
                  <p className="text-muted small mb-1">
                    {order.product?.category || 'Category'} | {order.product?.brand || 'Brand'}
                  </p>
                  <p className="small mb-2">
                    <strong>Color:</strong> {order.product?.color || '-'} &nbsp;|&nbsp;
                    <strong>Size:</strong> {order.product?.size || '-'}
                  </p>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(order.id, order.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="fw-semibold">{order.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(order.id, order.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="fw-bold text-success mb-2">
                    ₹{(order.product?.price * order.quantity || 0).toLocaleString()}
                  </p>
                  <span className="badge bg-info mb-3">Order ID: {order.id}</span>

                  <div className="d-flex justify-content-between btn-group-custom">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No orders found.</div>
        )}
      </div>

      {selectedOrders.length > 0 && (
        <div className="text-end mt-4">
          <h5 className="text-success">
            Total for Selected Orders: ₹{getTotal().toLocaleString()}
          </h5>
        </div>
      )}
    </div>
  );
};

export default Orders;
