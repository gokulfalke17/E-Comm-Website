import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterBar from '../components/Filterbar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products').then(res => {
      setProducts(res.data);
      setFiltered(res.data);
    });
  }, []);

  const handleSearch = (text) => {
    const result = products.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
  };

  const handleFilter = (category) => {
    if (category === '') return setFiltered(products);
    const result = products.filter(p => p.category === category);
    setFiltered(result);
  };

  const handleSort = (type) => {
    let sorted = [...filtered];
    if (type === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (type === 'id') sorted.sort((a, b) => a.id - b.id);
    else if (type === 'price') sorted.sort((a, b) => a.price - b.price);
    setFiltered(sorted);
  };

  return (
    <div className="container mt-4">
      <FilterBar onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort} />
      <div className="row g-4">
        {filtered.map(product => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
