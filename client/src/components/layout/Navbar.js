import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Badge,
  Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';

import SearchedProductPage from '../pages/SearchedProductPage';
import { getProducts } from '../../actions/productsActions';
const NavbarComponent = () => {
  const [search, setSearch] = useState('');
  const cartItems = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <Nav.Link href='/'>
            <Navbar.Brand onClick={() => dispatch(getProducts())}>
              E-Commerce
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className=' mr-auto ml-auto'>
              <SearchedProductPage />
            </Nav>
            <Nav className='ml-auto'>
              <LinkContainer to={`/admin`}>
                <Nav.Link>Admin Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  {' '}
                  Cart <Badge variant='secondary'>{cartItems.length}</Badge>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div> //Login will disappear once logged in
  );
};

export default NavbarComponent;
