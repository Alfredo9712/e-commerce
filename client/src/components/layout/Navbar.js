import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const NavbarComponent = () => {
  const [search, setSearch] = useState('');
  let history = useHistory();
  // const handleClick = (e) => {
  //   history.push(`/search/${search}`);
  // };

  return (
    <div>
      <Navbar bg='primary' variant='dark'>
        <LinkContainer to='/'>
          <Navbar.Brand>E-Commerce</Navbar.Brand>
        </LinkContainer>
        <Nav className='mr-auto'>
          <LinkContainer to='/about'>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>

          <FormControl
            type='search'
            placeholder='Search'
            className='mr-sm-2'
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to={`/search/${search}`}>
            <Button variant='outline-light'>Search</Button>
          </Link>
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
