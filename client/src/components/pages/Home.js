import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getShirts,
  getPants,
} from "../../actions/productsActions";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Card,
  NavDropdown,
} from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);

  const loadPants = () => {
    dispatch(getPants());
  };

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
    <div style={{ display: "flex" }} className="main">
      <Row style={{ flex: ".2" }}>
        <Navbar
          bg="secondary"
          style={{
            width: "80px",
            height: "926px",
            position: "sticky",
            top: "0",
          }}
        >
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              className="flex-column"
              style={{
                marginLeft: "5px",
                marginTop: "-550px",
              }}
            >
              <Nav.Link style={{ pointerEvents: "none" }}>
                <h5>Category</h5>
              </Nav.Link>
              <Nav.Link onClick={loadShirts}>
                <h6>Shirts</h6>
              </Nav.Link>
              <Nav.Link onClick={loadPants}>
                <h6>Pants</h6>
              </Nav.Link>

              <Nav.Link onClick={loadAll}>
                <h6>All</h6>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row style={{ flex: ".8" }}>
        {products.map((product) => (
          <Col md={"auto"} key={product._id} className="smallRow">
            <div key={product._id} style={{ marginTop: "40px" }}>
              <Card style={{ width: "17rem", marginBottom: "20px" }}>
                <Link to={`/product/${product.category}/${product._id}`}>
                  <Card.Img
                    variant="top"
                    src={`${product.image}`}
                    style={{
                      height: "270px",
                      width: "270px",
                      objectFit: "contain",
                    }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{product.product}</Card.Title>$
                  {product.sizes[0].price} - ${product.sizes[2].price}
                </Card.Body>{" "}
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
