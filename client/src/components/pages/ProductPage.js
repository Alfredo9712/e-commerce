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

const ProductPage = () => {
  const [productItem, setProductItem] = useState({});
  const [sizeIndex, setSizeIndex] = useState(0);

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
  const changeIndexHandler = (size) => {
    // if ((sizeIndex === 1 || sizeIndex === 0) && size === 'large') {
    //   setSizeIndex(sizeIndex + 1);
    // }
    // if (sizeIndex === 0 && size === 'medium') {
    //   setSizeIndex(sizeIndex + 1);
    // }
    // if (sizeIndex === 1 && size === 'small') {
    //   setSizeIndex(sizeIndex - 1);
    // }
  };
  const addToCartHandler = (productItem) => {
    const itemToCart = { product, image };
    dispatch(addToCart(productItem));
  };
  const updateCartHandler = (quantity, size) => {};
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
                      // onClick={() => changeIndexHandler(size.size)}
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
                  Quantity
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[...Array(sizes[sizeIndex].quantity)].map((x, i) => (
                    <Dropdown.Item>{i + 1}</Dropdown.Item>
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
