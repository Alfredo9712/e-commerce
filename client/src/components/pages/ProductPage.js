import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, ToggleButton } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const [product, setProduct] = useState('');

  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');

  const { id, category } = useParams();
  const fetchProduct = async () => {
    const request = await axios.get(
      `http://localhost:5000/api/${category}/${id}`
    );
    const data = request.data;
    console.log(data);
    setProduct(data.product);
    setImage(data.image);
    setSizes(data.sizes);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <img width='500px' height='500px' src={image} />
        </Col>
        <Col>
          <h1>ID: {id} </h1>
          <h1>category: {category} </h1>
          <h1>product: {product}</h1>
          <p>
            {sizes.map((size) =>
              size.quantity > 0 /* !==0 */ ? (
                <Button
                  onClick={(e) => setSelectedSize(e.currentTarget.textContent)}
                >
                  {size.size}
                </Button>
              ) : (
                <Button disabled>{size.size}</Button>
              )
            )}
          </p>
          <p>
            <Button>Add To Cart</Button>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
