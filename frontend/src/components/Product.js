import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' style={{ width: '18rem' }}>
      <a href={`/product/${product._id}`}>
        <Card.Img className='rounded' variant='top' src={product.image} />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as='div'>{product.name}</Card.Title>
        </a>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={` ${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' style={{ padding: '1rem 0' }}>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
