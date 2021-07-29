import React, { useState } from 'react';
import { Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import filebase64 from 'react-file-base64';
import fs from 'browserify-fs';

import ImageComponent from './ImageComponent';
const AddItem = () => {
  const token = localStorage.getItem('token');

  const [item, setItem] = useState({
    product: '',
    category: '',
    image: '',
    sizes: [
      { size: 'small', quantity: null, price: null },
      { size: 'medium', quantity: null, price: null },
      { size: 'large', quantity: null, price: null },
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
    const { category, product, image, sizes } = item;
    const config = {
      headers: {
        'x-auth-token': token,
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
    console.log(response.data);

    setItem({
      product: '',
      category: '',
      image: '',
      sizes: [
        { size: 'small', quantity: null, price: null },
        { size: 'medium', quantity: null, price: null },
        { size: 'large', quantity: null, price: null },
      ],
    });
  };
  return (
    <div style={{ marginTop: '30px' }}>
      <h1>Add product</h1>
      <Form onSubmit={sumbitHandler}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              value={item.product}
              placeholder='Enter Product Name'
              onChange={(e) => setItem({ ...item, product: e.target.value })}
            />
          </Form.Group>

          <Dropdown as={Col} style={{ marginTop: '30px' }}>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              {item.category === '' ? 'Select Category' : item.category}
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

        {item.sizes.map((size) => (
          <Row>
            <Form.Group as={Col}>
              <Form.Label>{size.size}</Form.Label>
              <Form.Control
                type='text'
                value={size.quantity === null ? '' : size.quantity}
                placeholder='Enter quantity for small'
                onChange={(e) =>
                  quantityHandler(Number(e.target.value), size.size)
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Price for {size.size}</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price for medium'
                value={size.price === null ? '' : size.price}
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

      <Button onClick={sumbitHandler}>Submit</Button>
    </div>
  );
};

export default AddItem;
