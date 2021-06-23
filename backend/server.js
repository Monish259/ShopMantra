import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js'; //need to add .js if importing files in node using ES syntax
const app = express();

dotenv.config();

app.get('/', (req, res) => {
  res.send('app is running on port 5000');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `connected to ${process.env.NODE_ENV} server and listening to port ${process.env.PORT}`
  )
);
