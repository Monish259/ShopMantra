import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
// ? in end of a path mdepicts that parameter is not mandatory for this path
const App = () => {
  // ? in path means that mentioned parameter may or may not be present in URL for e.g :id in /cart path
  return (
    <Router>
      <Header />

      <main className='py-2'>
        <Container>
          <Route path='/' component={Homescreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
