import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getuserDetails, updateUser } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // so that password and confirm password const have diff values
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updated = useSelector((state) => state.userUpdate);
  const { success } = updated; //to show message if profile is updated or not

  useEffect(() => {
    if (!userInfo) history.push('/login');
    else {
      if (!user || Object.keys(user).length === 0) {
        dispatch(getuserDetails('profile'));
      }
      //to set id parameter as profile
      else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword ||
      password === '' ||
      confirmPassword === ''
    )
      setMessage('Passwords do not match !!');
    else if (
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      const updatedUser = {
        id: user._id,
        name,
        email,
        password,
      };
      dispatch(updateUser(updatedUser));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>

        <Form onSubmit={submitHandler}>
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
