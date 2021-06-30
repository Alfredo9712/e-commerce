import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getShirts } from '../../actions/getProducts';
import { Link } from 'react-router-dom';
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
    <>
      <Row>
        {products.map((product) => (
          <Col md={4}>
            <div key={product._id}>
              <Card style={{ width: '16rem' }}>
                <Link to={`/product/${product.category}/${product._id}`}>
                  <Card.Img variant='top' src={product.image} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.product}</Card.Title>
                </Card.Body>{' '}
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <button onClick={loadShirts}>Load Shirts</button>{' '}
      <button onClick={loadAll}>Load All Again</button>{' '}
    </>
  );
};

export default Home;
