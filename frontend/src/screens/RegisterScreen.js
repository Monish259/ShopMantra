import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // so that password and confirm password const have diff values
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userReg = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userReg;

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      setMessage('Passwords do not match !!');
    } else dispatch(register(name, email, password));
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <Form onSubmit={submitHandler}>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <FormGroup controlId='name' className='mb-3 mt-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='email' className='mt-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId='password' className='mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId='confirmPassword' className='mt-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <Button className='my-4 rounded' variant='primary' type='submit'>
              Sign Up
            </Button>

            <Row className='my-3'>
              <Col>
                Already have an account ?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Login
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
