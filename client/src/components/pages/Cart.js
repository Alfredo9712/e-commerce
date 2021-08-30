import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
  Dropdown,
  Modal,
  Alert,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import {
  addToCart,
  deleteCartItem,
  deleteCart,
} from "../../actions/cartActions";
import { Link } from "react-router-dom";
import Checkout from "../layout/Checkout";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [deleted, SetDeleted] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const deleteFromCartHandler = (cartItem) => {
    dispatch(deleteCartItem(cartItem));
    SetDeleted(true);
    setTimeout(function () {
      SetDeleted(false);
    }, 3000);
  };
  const addToCartHandler = (productItem, newQuantity) => {
    const updatedItem = { ...productItem, selectedQuantity: newQuantity };

    dispatch(addToCart(updatedItem));
  };
  const deleteCartHandler = () => {
    dispatch(deleteCart());
    setShow(false);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container className="main">
      <Row>
        <Col md={9}>
          <h1>Shopping Cart</h1>
          {cartItems.length <= 0 && (
            <h4 style={{ marginTop: "30px" }}>Cart is empty</h4>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Deleting Cart Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to Delete all cart items
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={deleteCartHandler}>
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {deleted && <Alert variant="danger">Item was Deleted</Alert>}

          <div>
            {cartItems.map((cartItem) => (
              <Card
                style={{ width: "18rem", marginTop: "15px" }}
                key={cartItem.id}
              >
                <Card.Body style={{ display: "flex" }}>
                  <Card.Img variant="top" src={cartItem.image} />
                  <Card.Body style={{ marginLeft: ".5em" }}>
                    <Card.Title style={{ width: "10rem" }}>
                      {cartItem.product}
                    </Card.Title>
                    <Card.Title>
                      Size: {cartItem.selectedSize.toUpperCase().slice(0, 1)}
                    </Card.Title>
                    <Dropdown style={{ marginTop: "-.5em" }}>
                      {" "}
                      Quantity:
                      <Dropdown.Toggle
                        variant="dark"
                        id="dropdown-basic"
                        style={{ marginLeft: ".5rem" }}
                      >
                        {cartItem.selectedQuantity}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => deleteFromCartHandler(cartItem)}
                        >
                          0 (Delete)
                        </Dropdown.Item>
                        {[...Array(cartItem.originalQuantity)].map((x, i) => (
                          <Dropdown.Item
                            key={i}
                            onClick={(e) =>
                              addToCartHandler(
                                cartItem,
                                Number(e.target.textContent)
                              )
                            }
                          >
                            {i + 1}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                </Card.Body>
              </Card>
            ))}
          </div>
          {cartItems.length >= 0 && (
            <>
              <Checkout />
            </>
          )}
        </Col>
        <Col md={3}>
          {" "}
          {cartItems.length > 0 && (
            <Button variant="dark" onClick={handleShow}>
              Delete Cart
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
{
}
export default Cart;
