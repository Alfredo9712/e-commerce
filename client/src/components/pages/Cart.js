import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { addToCart, deleteCartItem } from '../../actions/cartActions';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [sizeIndex, setSizeIndex] = useState(0);

  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const deleteFromCartHandler = (cartItem) => {
    dispatch(deleteCartItem(cartItem));
  };
  const addToCartHandler = (productItem, newQuantity) => {
    const updatedItem = { ...productItem, selectedQuantity: newQuantity };

    dispatch(addToCart(updatedItem));
  };

  return (
    <>
      <h3>Shopping Cart</h3>
      <div>
        {cartItems.map((cartItem) => (
          <Card style={{ width: '18rem' }}>
            <Card.Body style={{ display: 'flex' }}>
              <Card.Img variant='top' src={cartItem.image} />
              <Card.Body style={{ marginLeft: '.5em' }}>
                <Card.Title style={{ width: '10rem' }}>
                  {cartItem.product}
                </Card.Title>
                <Card.Title>
                  Size: {cartItem.selectedSize.toUpperCase().slice(0, 1)}
                </Card.Title>
                <Dropdown style={{ marginTop: '-.5em' }}>
                  {' '}
                  Quantity:
                  <Dropdown.Toggle
                    variant='success'
                    id='dropdown-basic'
                    style={{ marginLeft: '.5rem' }}
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
    </>
  );
};
{
}
export default Cart;
