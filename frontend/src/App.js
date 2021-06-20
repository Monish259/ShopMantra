import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';

const App = () => {
  return (
    <>
      <Header />

      <main className='py-2'>
        <Container className='d-flex flex-column justify-content-center align-items-center'>
          <Homescreen />
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
