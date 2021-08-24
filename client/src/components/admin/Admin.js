import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../actions/adminActions';
import { Alert } from 'react-bootstrap';
import AdminDash from './AdminDash';
import ErrorComponent from '../pages/ErrorComponent';
import HomeIcon from '@material-ui/icons/Home';
import { LinkContainer } from 'react-router-bootstrap';
const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.data);
  const error = useSelector((state) => state.error.data);
  const login = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };
  useEffect(() => {
    if (error.error !== false) {
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
    }
  }, [error]);

  return (
    <>
      {admin.authenticated ? (
        <AdminDash />
      ) : (
        <div
          style={{
            // background: 'rgb(0,30,204)',
            background: ' linear-gradient(210deg, #343A40 75%, #f7f0f0 25%)',
            height: '100vh',
          }}
        >
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Nav className='me-auto'>
                <LinkContainer to='/'>
                  <Nav.Link style={{ display: 'flex' }}>
                    {' '}
                    <HomeIcon
                      style={{ fontSize: '30px', paddingBottom: '7.5px' }}
                    />{' '}
                    <span style={{ fontSize: '15px' }}>Home</span>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Container>
          </Navbar>
          <Container
            style={{
              maxWidth: '35%',
            }}
          >
            <div style={{ paddingTop: '130px', color: 'white' }}>
              <h1 style={{ color: 'white' }}>Admin login</h1>

              {popup && <Alert variant='danger'>{error.error}</Alert>}
              <Form onSubmit={login}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    Click Load Admin Data to autofill login credentials
                  </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant='primary'
                  onClick={() => {
                    setEmail('ecommerce.react@gmail.com');
                    setPassword('CSUSB2020/2021');
                  }}
                >
                  Load Admin data
                </Button>
                <Button variant='primary' type='submit'>
                  Sign In
                </Button>
              </Form>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Admin;
