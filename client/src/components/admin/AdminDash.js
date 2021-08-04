import React from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from 'react-router-dom';
import AddItem from './AddItem';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import UpdateIcon from '@material-ui/icons/Update';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Redirect } from 'react-router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddUpdateItem from './AdminUpdateItem';
import { adminLogout } from '../../actions/adminActions';
import Dashboard from './Dashboard';
const AdminDash = () => {
  const isLoggedIn = useSelector((state) => state.admin.data.authenticated);
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(adminLogout());
    localStorage.setItem('token', '');
  };

  return (
    <>
      <Router>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '.1' }}>
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
                  <LinkContainer to='/admin'>
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
                  <Nav.Link onClick={signOutHandler}>
                    <ExitToAppIcon style={{ marginTop: '20px' }} />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div style={{ flex: '.8' }}>
            <Switch>
              <Route path='/add' component={AddItem}></Route>
              <Route path='/admin' component={Dashboard}></Route>
              <Route path='/update' component={AddUpdateItem}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default AdminDash;
