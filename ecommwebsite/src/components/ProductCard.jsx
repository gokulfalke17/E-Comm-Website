import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));
  const [isHovered, setIsHovered] = useState(false);

  const handleOrder = () => {
    if (!isLoggedIn) {
      toast.warn('Please login to place an order', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/login');
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const existingOrderIndex = allOrders.findIndex(
      (order) => order.userId === user.id && order.product.id === product.id && !order.cancelled
    );

    if (existingOrderIndex !== -1) {
      allOrders[existingOrderIndex].quantity += 1;
      toast.info(`Increased quantity for ${product.name}`, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      const newOrder = {
        id: Date.now(),
        userId: user.id,
        product: product,
        quantity: 1,
        cancelled: false,
        date: new Date().toISOString(),
      };
      allOrders.push(newOrder);
      toast.success(`Order placed for ${product.name}`, {
        position: "top-center",
        autoClose: 2000,
      });
    }

    localStorage.setItem('orders', JSON.stringify(allOrders));
    navigate('/orders');
  };

  return (
    <div 
      className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
      style={{
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="position-relative">
        <div
          style={{
            height: '220px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </div>
        {product.discount && (
          <div 
            className="position-absolute top-0 end-0 m-2 bg-danger text-white px-2 py-1 rounded-pill small"
            style={{ zIndex: 1 }}
          >
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column p-3" style={{ backgroundColor: '#ffffff' }}>
        <div className="mb-2">
          <h5 className="card-title fw-semibold mb-1" style={{ color: '#2c3e50' }}>
            {product.name}
          </h5>
          <div className="d-flex flex-wrap gap-2 mb-2">
            <span className="badge bg-info bg-opacity-10 text-info">
              {product.category}
            </span>
            <span className="badge bg-warning bg-opacity-10 text-warning">
              {product.brand}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-palette text-primary"></i>
            <small className="text-muted">Color: {product.color}</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-aspect-ratio text-primary"></i>
            <small className="text-muted">Size: {product.size}</small>
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="text-primary fw-bold mb-0">
                ₹{Number(product.price).toLocaleString()}
              </h6>
              {product.originalPrice && (
                <small className="text-decoration-line-through text-muted">
                  ₹{Number(product.originalPrice).toLocaleString()}
                </small>
              )}
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill text-warning me-1"></i>
              <small>{product.rating || '4.5'}</small>
            </div>
          </div>

          <button
            className="btn w-100 rounded-pill"
            onClick={handleOrder}
            style={{
              background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              color: 'white',
              border: 'none',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.02)' : 'none',
            }}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Order Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 576px) {
          .card {
            max-width: 100%;
            margin: 0 auto;
          }
        }
        .card:hover {
          z-index: 10;
        }
        .badge {
          font-size: 0.7rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;