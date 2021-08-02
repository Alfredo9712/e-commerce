import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Dropdown } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import ImageComponent from './ImageComponent';
import { editProduct } from '../../actions/productsActions';
import { useDispatch } from 'react-redux';
const EditModal = ({ product }) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(product);
  const handleClose = () => {
    setShow(false);
    setItem(product);
  };
  const handleShow = () => setShow(true);
  const editHandler = () => {
    dispatch(editProduct(item));
    setShow(false);
  };

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

  return (
    <>
      <EditIcon onClick={handleShow} />

      <Modal show={show} dialogClassName='modal-90w' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <h1>{product.product}</h1>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder={product.product}
                value={item.product}
                onChange={(e) => {
                  setItem({ ...item, product: e.target.value });
                }}
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
          <Form.Group as={Col}>
            <Form.Label>Upload product photo</Form.Label>
            <ImageComponent setItem={setItem} item={item} />
          </Form.Group>
          <Button>Submit</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={editHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
