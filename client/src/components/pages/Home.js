import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getShirts } from '../../actions/productsActions';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Card,
  NavDropdown,
} from 'react-bootstrap';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const loadShirts = () => {
    dispatch(getShirts());
  };
  const loadAll = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div style={{ display: 'flex' }}>
      <Row style={{ flex: '.2' }}>
        <Navbar
          bg='secondary'
          style={{
            width: '80px',
            height: '926px',
            position: 'sticky',
            top: '0',
          }}
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
              <Nav.Link>hi</Nav.Link>
              <Nav.Link>hi</Nav.Link>

              <Nav.Link>hi</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row style={{ flex: '.8' }}>
        {products.map((product) => (
          <Col md={'auto'}>
            <div key={product._id}>
              <Card style={{ width: '16rem', marginTop: '30px' }}>
                <Link to={`/product/${product.category}/${product._id}`}>
                  <Card.Img
                    variant='top'
                    src={product.image}
                    style={{
                      height: '250px',
                      width: '250px',
                      objectFit: 'contain',
                    }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{product.product}</Card.Title>$
                  {product.sizes[0].price} - ${product.sizes[2].price}
                </Card.Body>{' '}
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      {/* <button onClick={loadShirts}>Load Shirts</button>{' '}
      <button onClick={loadAll}>Load All Again</button>{' '} */}
    </div>
  );
};

export default Home;
