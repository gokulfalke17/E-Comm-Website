import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('orders');
    navigate('/login');
    setIsMenuOpen(false); 

  };

  const closeMobileMenu = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
      const collapse = document.getElementById('navbarNav');
      if (collapse.classList.contains('show')) {
        collapse.classList.remove('show');
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
        zIndex: 1050,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <div className="container-fluid px-3 px-md-4 px-lg-5">
        <Link className="navbar-brand text-white fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-shop me-2" style={{ fontSize: '1.5rem' }}></i>
          <span style={{ fontFamily: "'Poppins', sans-serif" }}>MyShop</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item me-lg-3 mb-2 mb-lg-0">
                  <div className="d-flex align-items-center text-white py-2 px-3 bg-primary bg-opacity-25 rounded">
                    <i className="bi bi-person-circle me-2"></i>
                    <strong style={{ fontSize: '1.1rem' }}>
                      {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
                    </strong>
                  </div>
                </li>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0" onClick={closeMobileMenu}>
                  <Link to="/" className="btn btn-outline-light w-100">
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0" onClick={closeMobileMenu}>
                  <Link to="/orders" className="btn btn-outline-light w-100">
                    <i className="bi bi-cart-check me-1"></i> Orders
                  </Link>
                </li>
                <li className="nav-item mb-2 mb-lg-0" onClick={closeMobileMenu}>
                  <button 
                    className="btn btn-light text-danger w-100"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0" onClick={closeMobileMenu}>
                  <Link to="/register" className="btn btn-outline-light w-100">
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Link>
                </li>
                <li className="nav-item mb-2 mb-lg-0" onClick={closeMobileMenu}>
                  <Link to="/login" className="btn btn-light text-primary w-100">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @media (max-width: 991.98px) {
          #navbarNav {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            padding: 1rem;
            margin-top: 0.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .navbar-nav {
            gap: 0.5rem;
          }
        }
        .navbar-brand {
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        .navbar-brand:hover {
          transform: scale(1.02);
        }
      `}</style>
    </nav>
  );
};

export default Header;