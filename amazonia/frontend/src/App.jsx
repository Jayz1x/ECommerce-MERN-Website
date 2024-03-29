import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './pages/HomeScreen.jsx';
import ProductScreen from './pages/productScreen.jsx';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store.js';
import CartScreen from './pages/CartScreen.jsx';
import signinScreen from './pages/SignInScreen.jsx';
import SignUpScreen from './pages/SignUpScreen.jsx';
import ShippingAdressScreen from './pages/ShippingAdressScreen.jsx';
import PaymentMethodScreen from './pages/PaymentMethodScreen.jsx';
import PlaceOrderScreen from './pages/PlaceOrderScreen.jsx';
import OrderScreen from './pages/OrderScreen.jsx';
import OrderHistoryScreen from './pages/OrderHistoryScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';


function App() {
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const { cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin';
  }
  return (
    <Router>
    <div className="d-flex flex-column site-container">
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                Amazona
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto w-100 justify-content-end'>
              <Link to='/cart' className='nav-link'>
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg='danger'>
                    {cart.cartItems.length}
                  </Badge>
                )

                }
              </Link >
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orderhistory'>
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                  className='dropdown-item'
                  to='#signout'
                  onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ): (
                <Link className='nav-link' to='/signin'>
                Sign In
                </Link>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path='/product/:slug'  Component={ProductScreen}/>
            <Route path='/cart' Component={CartScreen} />
            <Route path='/signin' Component={signinScreen}/>
            <Route path='/' Component={HomeScreen} />
            <Route path='/shipping' Component={ShippingAdressScreen}/>
            <Route path='/payment' Component={PaymentMethodScreen}/>
            <Route path='/signup' Component={SignUpScreen}/>
            <Route path='/placeorder' Component={PlaceOrderScreen}/>
            <Route path='/order/:id' Component={OrderScreen} />
            <Route path='/orderhistory' Component={OrderHistoryScreen} />
            <Route path='/profile' Component={ProfileScreen}/>
          </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
    </Router>
  );
}

export default App;
