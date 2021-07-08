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
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import uuid from 'react-uuid';

const ProductPage = () => {
  const [productItem, setProductItem] = useState({});
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
  const changeIndexHandler = (size, index, quantity) => {
    setSizeIndex(index);
    setSelectedSize(size);
    setOriginalQuantity(quantity);
  };
  const addToCartHandler = (productItem) => {
    if (selectedSize === '') {
      alert('select a size bruh');
      return;
    }
    if (selectedQuantity === 0) {
      alert('select a quantity bruh');
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
    };
    dispatch(addToCart(itemToCart));
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const { product, image, sizes } = productItem;
  return (
    <div>
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
                        changeIndexHandler(size.size, index, size.quantity)
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
