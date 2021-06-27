import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
//  useSelector used to select state from reducer fn
//  useDispatch used to call(dispatch) actions to manipulate state

const Homescreen = () => {
  //const [products, setProducts] = useState([]); //set products to empty array

  const dispatch = useDispatch(); //used to call actions

  const productList = useSelector((state) => state.productList); //reducer fn which are created will come in state and stored in store.js file in comibneReducers
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts()); //need to add () after fn in dispatch function to call action
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     //await is used coz promise is returned by axios call
  //     const { data } = await axios.get('/api/products'); //fetch all products from backend
  //     setProducts(data); //will set products state to data
  //   };
  //   fetchProducts();
  // }, []); //empty array can hold dependencies on change of which useEffect will run for this component

  return (
    <>
      <h1 className='d-flex flex-column justify-content-center align-items-center'>
        Latest Products
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'></Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xml={3} key={`${product._id}`}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homescreen;
