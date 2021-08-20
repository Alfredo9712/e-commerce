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
import ListAltIcon from '@material-ui/icons/ListAlt';

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Redirect } from 'react-router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddUpdateItem from './AdminUpdateItem';
import { adminLogout } from '../../actions/adminActions';
import Dashboard from './Dashboard';
import useWindowDimensions from './windowSize';
import OrderHistory from './OrderHistory';

const AdminDash = () => {
  const isLoggedIn = useSelector((state) => state.admin.data.authenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const signOutHandler = () => {
    dispatch(adminLogout());
    localStorage.setItem('token', '');
    history.push('/admin');
  };
  const { width } = useWindowDimensions();

  return (
    <>
      <Router>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '.1' }}>
            {width > 800 ? (
              <Navbar
                bg='primary'
                variant='dark'
                style={{
                  width: '80px',
                  height: '100vh',
                }}
              >
                <Navbar.Collapse id='navbarScroll'>
                  <Nav
                    className='me-auto'
                    className='flex-column'
                    style={{
                      marginLeft: '5px',
                    }}
                  >
                    <LinkContainer to='/admin'>
                      <Nav.Link>
                        <HomeIcon style={{ marginTop: '20px' }} />
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/orderHistory'>
                      <Nav.Link>
                        <ListAltIcon style={{ marginTop: '20px' }} />
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
            ) : (
              ''
            )}
          </div>
          <div style={{ flex: '.8' }}>
            <Switch>
              <Route path='/add' component={AddItem}></Route>
              <Route path='/admin' component={Dashboard}></Route>
              <Route path='/update' component={AddUpdateItem}></Route>
              <Route path='/orderHistory' component={OrderHistory}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default AdminDash;
