import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const Homescreen = () => {
  const [products, setProducts] = useState([]); //set products to empty array

  useEffect(() => {
    const fetchProducts = async () => {
      //await is used coz promise is returned by axios call
      const { err, data } = await axios.get('/api/products'); //fetch all products from backend
      if (err) console.log(err);
      else setProducts(data); //will set products state to data
    };
    fetchProducts();
  }, []); //empty array can hold dependencies on change of which useEffect will run for this component

  return (
    <>
      <h1 className='d-flex flex-column justify-content-center align-items-center'>
        Latest Products
      </h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xml={3} key={`${product._id}`}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homescreen;
