import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Button,
  ToggleButton,
  Spinner,
  Dropdown,
  Alert,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import uuid from 'react-uuid';

const ProductPage = () => {
  const [productItem, setProductItem] = useState({});
  const [variant, setVariant] = useState('');
  const [text, setText] = useState('');
  const [popup, setPopup] = useState(false);
  const [itemPrice, setPrice] = useState(null);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [originalQuantity, setOriginalQuantity] = useState(0);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id, category } = useParams();

  const fetchProduct = async () => {
    const request = await axios.get(
      `http://localhost:5000/api/${category}/${id}`
    );
    const data = request.data;
    console.log(data);
    setProductItem(data);
    setLoading(false);
  };
  const changeIndexHandler = (size, index, quantity, itemPrice) => {
    setSizeIndex(index);
    setSelectedSize(size);
    setPrice(itemPrice);
    setOriginalQuantity(quantity);
  };
  const addToCartHandler = (productItem) => {
    if (selectedSize === '') {
      setPopup(true);
      setText('Please select a size');
      setVariant('danger');
      setTimeout(function () {
        setPopup(false);
        setText('');
        setVariant('');
      }, 3000);
      return;
    }
    if (selectedQuantity === 0) {
      setPopup(true);
      setText('Please select a quantity');
      setVariant('danger');
      setTimeout(function () {
        setText('');
        setVariant('');
        setPopup(false);
      }, 3000);
      return;
    }

    const itemToCart = {
      product,
      image,
      selectedQuantity,
      selectedSize,
      originalQuantity,
      id,
      cartId: uuid(),
      price: itemPrice,
    };
    dispatch(addToCart(itemToCart));
    setPopup(true);
    setText('Added to cart');
    setVariant('success');
    setTimeout(function () {
      setText('');
      setVariant('');
      setPopup(false);
    }, 3000);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const { product, image, sizes } = productItem;
  return (
    <div>
      {popup && <Alert variant={variant}>{text}</Alert>}

      {loading ? (
        <Spinner animation='border' />
      ) : (
        <Row>
          <Col>
            <img width='500px' height='500px' src={image} />
          </Col>
          <Col>
            <h1>ID: {id} </h1>
            <h1>category: {category} </h1>
            <h1>product: {product}</h1>
            <p>
              <h1>Quantity</h1>
              {sizes.map((size, index) =>
                size.quantity > 0 ? (
                  <>
                    <Button
                      onClick={() =>
                        changeIndexHandler(
                          size.size,
                          index,
                          size.quantity,
                          size.price
                        )
                      }
                      id={`tbg-btn-${index + 1}`}
                      value={index + 1}
                    >
                      {size.size}
                    </Button>
                  </>
                ) : (
                  <Button disabled>{size.size}</Button>
                )
              )}
            </p>

            <>
              <Dropdown>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  Quantity: {selectedSize}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[...Array(sizes[sizeIndex].quantity)].map((x, i) => (
                    <Dropdown.Item
                      onClick={(e) =>
                        setSelectedQuantity(Number(e.target.textContent))
                      }
                    >
                      {i + 1}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </>

            <p>
              <Button onClick={() => addToCartHandler(productItem)}>
                Add To Cart
              </Button>
            </p>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default ProductPage;
