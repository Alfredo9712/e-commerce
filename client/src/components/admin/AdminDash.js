import React from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AddItem from './AddItem';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import UpdateIcon from '@material-ui/icons/Update';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Redirect } from 'react-router';
import AddUpdateItem from './AdminUpdateItem';
import Admin from './Admin';
const AdminDash = () => {
  const isLoggedIn = useSelector((state) => state.admin.data.authenticated);
  return (
    <Router>
      <Row>
        <Col sm={1}>
          <Navbar
            bg='primary'
            variant='dark'
            style={{ width: '80px', height: '926px' }}
          >
            <Navbar.Collapse id='navbarScroll'>
              <Nav
                className='me-auto'
                className='flex-column'
                style={{
                  marginLeft: '5px',
                  marginTop: '-650px',
                }}
              >
                <LinkContainer to='/adminHome'>
                  <Nav.Link>
                    <HomeIcon style={{ marginTop: '20px' }} />
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/add'>
                  <Nav.Link>
                    <AddShoppingCartIcon style={{ marginTop: '20px' }} />
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/update'>
                  <Nav.Link>
                    <UpdateIcon style={{ marginTop: '20px' }} />
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/delete'>
                  <Nav.Link>
                    <DeleteForeverIcon style={{ marginTop: '20px' }} />
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col sm={11}>
          <Switch>
            <Route path='/add' component={AddItem}></Route>
            <Route path='/update' component={AddUpdateItem}></Route>
          </Switch>
        </Col>
      </Row>
    </Router>
  );
};

export default AdminDash;
