import React, { useState } from "react";
import { Row, Col, Button, Form, Dropdown, Alert } from "react-bootstrap";
import axios from "axios";

import ImageComponent from "./ImageComponent";
const AddItem = () => {
  const token = localStorage.getItem("token");
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [item, setItem] = useState({
    product: "",
    category: "",
    image: "",
    sizes: [
      { size: "small", quantity: null, price: null },
      { size: "medium", quantity: null, price: null },
      { size: "large", quantity: null, price: null },
    ],
  });
  const quantityHandler = (newItem, size) => {
    const updateSizes = item.sizes.map((item) =>
      item.size === size ? { ...item, quantity: newItem } : item
    );
    setItem({ ...item, sizes: updateSizes });
  };
  const priceHandler = (newItem, size) => {
    const updateSizes = item.sizes.map((item) =>
      item.size === size ? { ...item, price: newItem } : item
    );
    setItem({ ...item, sizes: updateSizes });
  };
  const sumbitHandler = async (e) => {
    item.sizes.forEach((i) => {
      i.quantity || (i.price === null && setError(true));
    });
    setTimeout(() => {
      setError(false);
    }, 2000);
    if (item.product === "" || item.category === "" || item.image === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const { category, product, image, sizes } = item;
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      e.preventDefault();
      const response = await axios.post(
        `/api/${category}`,
        {
          category,
          product,
          image,
          sizes,
        },
        config
      );
      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
      }, 2000);

      setItem({
        product: "",
        category: "",
        image: "",
        sizes: [
          { size: "small", quantity: null, price: null },
          { size: "medium", quantity: null, price: null },
          { size: "large", quantity: null, price: null },
        ],
      });
    }
  };
  return (
    <div style={{ marginTop: "30px" }} className="addProduct">
      <h1>Add Product</h1>
      {error && <Alert variant="warning"> Please enter all fields</Alert>}
      {confirm && <Alert variant="success"> Item Added</Alert>}
      <Form onSubmit={sumbitHandler} style={{ marginTop: "40px" }}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={item.product}
              placeholder="Enter Product Name"
              onChange={(e) => setItem({ ...item, product: e.target.value })}
            />
          </Form.Group>

          <Dropdown as={Col} style={{ marginTop: "30px" }}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {item.category === "" ? "Select Category" : item.category}
            </Dropdown.Toggle>

            <Dropdown.Menu
              onClick={(e) =>
                setItem({ ...item, category: e.target.textContent })
              }
            >
              <Dropdown.Item>pants</Dropdown.Item>
              <Dropdown.Item>shirts</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>

        {item.sizes.map((size, index) => (
          <Row key={index}>
            <Form.Group as={Col}>
              <Form.Label style={{ textTransform: "capitalize" }}>
                {size.size}
              </Form.Label>
              <Form.Control
                type="text"
                value={size.quantity === null ? "" : size.quantity}
                placeholder={`Enter quantity for ${size.size}`}
                onChange={(e) =>
                  quantityHandler(Number(e.target.value), size.size)
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Price for {size.size}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter price for ${size.size}`}
                value={size.price === null ? "" : size.price}
                onChange={(e) =>
                  priceHandler(Number(e.target.value), size.size)
                }
              />
            </Form.Group>
          </Row>
        ))}
      </Form>

      <Form.Group as={Col}>
        <Form.Label>Upload product photo</Form.Label>
        <ImageComponent setItem={setItem} item={item} />
      </Form.Group>

      <Button onClick={sumbitHandler} style={{ marginTop: "20px" }}>
        Submit
      </Button>
    </div>
  );
};

export default AddItem;
