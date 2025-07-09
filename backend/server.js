const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
  res.json([{ id: 1, name: 'Shirt', price: 500 }]);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
