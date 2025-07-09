import { useState } from 'react';

const FilterBar = ({ onSearch, onFilter, onSort }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="filter-bar-container p-3 rounded-3 mb-4 shadow-sm">
      <div className="row g-3 align-items-center">

        <div className="col-12 col-md-6 col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-primary"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch(e.target.value);
              }}
              style={{ borderLeft: 'none' }}
            />
          </div>
        </div>

        <div className="col-6 col-md-3 col-lg-2">
          <div className="input-group">
            <span className="input-group-text bg-info text-white">
              <i className="bi bi-filter"></i>
            </span>
            <select 
              className="form-select border-info"
              onChange={(e) => onFilter(e.target.value)}
              style={{ borderLeft: 'none' }}
            >
              <option value="">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>
        </div>

        <div className="col-6 col-md-3 col-lg-2">
          <div className="input-group">
            <span className="input-group-text bg-warning text-dark">
              <i className="bi bi-sort-down"></i>
            </span>
            <select 
              className="form-select border-warning"
              onChange={(e) => onSort(e.target.value)}
              style={{ borderLeft: 'none' }}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="id">ID</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <div className="col-12 col-md-12 col-lg-4 d-flex justify-content-lg-end">
          <button 
            className="btn btn-danger px-4"
            onClick={() => {
              setSearch('');
              onSearch('');
              onFilter('');
              onSort('');
              document.querySelectorAll('.form-select').forEach(select => {
                select.value = '';
              });
            }}
          >
            <i className="bi bi-x-circle me-2"></i>
            Clear Filters
          </button>
        </div>
      </div>

      <style jsx>{`
        .filter-bar-container {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 1px solid rgba(0,0,0,0.1);
        }
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 0.25rem rgba(13,110,253,0.15);
        }
        @media (max-width: 768px) {
          .filter-bar-container {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;