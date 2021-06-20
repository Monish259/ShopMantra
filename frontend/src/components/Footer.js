import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <Col>
          <Row className='py-3'>Copyright &copy; ShopMantra2021</Row>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
