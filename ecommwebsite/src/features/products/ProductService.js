import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const ProductService = { getAll };
export default ProductService;
