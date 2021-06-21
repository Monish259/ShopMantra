import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

const Homescreen = () => {
  return (
    <>
      <h1 className='d-flex flex-column justify-content-center align-items-center'>
        Latest Products
      </h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xml={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homescreen;
