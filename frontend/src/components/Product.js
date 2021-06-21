import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img className='rounded' variant='top' src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as='div'>{product.name}</Card.Title>
        </Link>

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
