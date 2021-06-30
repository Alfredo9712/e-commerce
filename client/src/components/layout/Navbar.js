import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <div>
      <Navbar bg='primary' variant='dark'>
        <Navbar.Brand href='/'>E-Commerce</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#shirts'>Shirts</Nav.Link>
          <Nav.Link href='#pants'>Pants</Nav.Link>
          <Nav.Link href='/about'>About</Nav.Link>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-light'>Search</Button>
          </Form>
        </Nav>
        <Nav>
          <Nav.Link href='/login'>Login</Nav.Link>
          <Nav.Link href='/cart'>Cart</Nav.Link>
        </Nav>
      </Navbar>
    </div> //Login will disappear once logged in
  );
};

export default NavbarComponent;
