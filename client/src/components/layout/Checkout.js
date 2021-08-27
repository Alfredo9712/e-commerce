import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";

import { useSelector, useDispatch } from "react-redux";
import { data } from "./mockData";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { updateProducts } from "../../actions/productsActions";
import { deleteCart } from "../../actions/cartActions";
import PurchaseConfirmation from "./PurchaseConfirmation";
function Checkout() {
  const cartItems = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [card, setCard] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [show2, setShow2] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    email: "",
    phone: null,
    name: "",
    address: {
      city: "",
      line1: "",
      state: "",
      postal_code: null,
    },
  });
  const stripe = useStripe();
  const elements = useElements();
  const mockHandler = () => {
    setBillingInfo(data);
  };
  const test = {
    width: "100%",
  };
  const testHandler = () => {
    dispatch(updateProducts(cartItems));
    // dispatch(deleteCart());
  };

  const sumbitOrder = async () => {
    const order = cartItems.map(
      (item) =>
        item && {
          price: item.quantityPrice,
          category: item.category,
          product: item.product,
          quantityPurchased: item.selectedQuantity,
          sizePurchased: item.selectedSize,
        }
    );

    await axios.post("/api/order", {
      amount: cartItems.reduce((accu, cur) => accu + cur.quantityPrice, 0),
      order,
      billingDetails: billingInfo,
    });
    const { name, email } = billingInfo;
    const emailParams = {
      subjectDetails: "E-commerce order confirmation",
      clientEmail: email,
      clientName: name,
      total: cartItems.reduce((accu, cur) => accu + cur.quantityPrice, 0),
    };
    emailjs
      .send(
        "service_wr8fymg",
        "template_y0i84tl",
        emailParams,
        "user_pGAwoYSZYBM0A4ixJh7kp"
      )
      .then(
        (result) => {
          setEmailResult(result);
        },
        (error) => {
          setEmailError(error);
        }
      );
  };

  const submitHandler = async (e) => {
    const cardElement = elements.getElement(CardElement);
    const cardNumber = elements.getElement(CardNumberElement);
    console.log(cardNumber);
    if (
      billingInfo.email === "" ||
      billingInfo.phone === null ||
      billingInfo.name === "" ||
      billingInfo.address.city === "" ||
      billingInfo.address.line1 === "" ||
      billingInfo.address.state === "" ||
      billingInfo.address.postal_code === null ||
      card === false
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const amount =
        cartItems.reduce((accu, cur) => accu + cur.quantityPrice, 0) * 100;

      e.preventDefault();
      setIsProcessing(true);
      //prettier-ignore
      const { data: client_secret } = await axios.post('/create-payment-intent',{amount});

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingInfo,
      });

      const confirmCardPayment = await stripe.confirmCardPayment(
        client_secret.client_secret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );
      setIsProcessing(false);
      setConfirmed(true);

      sumbitOrder();
      dispatch(updateProducts(cartItems));

      setShow2(true);
      dispatch(deleteCart()); // not showing confirm
    }
  };

  //CardElement Styling
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "15px",
        lineHeight: "30px",
        border: "2px",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
        iconColor: "white",
      },
    },
  };
  return (
    <>
      {confirmed ? (
        <PurchaseConfirmation setShow2={setShow} show2={show} />
      ) : (
        !confirmed &&
        cartItems.length > 0 && (
          <>
            {" "}
            <Button
              variant="primary"
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={() => setShow(true)}
            >
              Continue to Checkout
            </Button>
            <div>
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Form onSumbit={(e) => submitHandler(e)}>
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Checkout
                    </Modal.Title>
                  </Modal.Header>
                  <Row>
                    <Col xs={12} md={6}>
                      <Modal.Body>
                        {error && (
                          <Alert variant="warning">
                            Please enter all fields
                          </Alert>
                        )}
                        <h3>Contact information</h3>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2}>
                            Email:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              value={billingInfo.email}
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  email: e.target.value,
                                })
                              }
                              type="email"
                              placeholder="Email"
                              style={{ width: "250px" }}
                            />
                          </Col>
                          <Form.Label column sm={2}>
                            Phone:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  phone: e.target.value,
                                })
                              }
                              value={billingInfo.phone}
                              type="Phone"
                              placeholder="Phone"
                              style={{ width: "250px" }}
                            />
                          </Col>
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Body>
                        <h3>Shipping Address</h3>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2}>
                            First Name:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  name: e.target.value,
                                })
                              }
                              value={billingInfo.name}
                              type="input"
                              placeholder="Name"
                              style={{ width: "250px" }}
                            />
                          </Col>

                          <Form.Label column sm={2}>
                            Address:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  address: { line1: e.target.value },
                                })
                              }
                              value={billingInfo.address.line1}
                              type="input"
                              placeholder="Address"
                              style={{ width: "250px" }}
                            />
                          </Col>

                          <Form.Label column sm={2}>
                            City:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              value={billingInfo.address.city}
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  address: { city: e.target.value },
                                })
                              }
                              type="input"
                              placeholder="City"
                              style={{ width: "250px" }}
                            />
                          </Col>

                          <Form.Label column sm={2}>
                            State:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              value={billingInfo.address.state}
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  address: { state: e.target.value },
                                })
                              }
                              type="input"
                              placeholder="State"
                              style={{ width: "250px" }}
                            />
                          </Col>
                          <Form.Label column sm={2}>
                            Zip Code:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                              value={billingInfo.address.postal_code}
                              onChange={(e) =>
                                setBillingInfo({
                                  ...billingInfo,
                                  address: { postal_code: e.target.value },
                                })
                              }
                              type="input"
                              placeholder="Zip Code"
                              style={{ width: "250px" }}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group>
                          <h3>Payment Info</h3>

                          <div
                            style={{
                              boxShadow:
                                "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
                              borderRadius: "7px",
                            }}
                          >
                            {" "}
                            <CardElement
                              options={cardElementOptions}
                              onChange={(element, value) => {
                                setCard(element.complete);
                                console.log(element);
                              }}
                            ></CardElement>
                          </div>
                          <h6
                            className="text-muted"
                            style={{
                              marginTop: "5px",
                              marginLeft: "6px",
                              fontSize: "11px",
                            }}
                          >
                            {" "}
                            Enter 4242 for all card values
                          </h6>
                        </Form.Group>
                      </Modal.Body>
                    </Col>
                    <Col xs={12} md={6}>
                      <Modal.Body>
                        <h3>Order Summary</h3>
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              borderBottom: "3px solid black",
                            }}
                          >
                            <img
                              src={item.image}
                              style={{ width: "65px", height: "65px" }}
                            ></img>
                            <h4 style={{ marginLeft: "10px" }}>
                              {item.product}{" "}
                              <p
                                style={{
                                  display: "block",
                                }}
                              >
                                quantity: {item.selectedQuantity}
                              </p>
                            </h4>
                          </div>
                        ))}
                        <h4 style={{ marginTop: "10px" }}>
                          Total price: $
                          {cartItems.reduce(
                            (accu, cur) => accu + cur.quantityPrice,
                            0
                          )}
                        </h4>

                        <Button
                          variant="primary"
                          onClick={submitHandler}
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing.." : "checkout"}
                        </Button>
                        <Button variant="dark" onClick={() => mockHandler()}>
                          Load Data
                        </Button>
                      </Modal.Body>
                    </Col>
                  </Row>
                </Form>
              </Modal>{" "}
            </div>
          </>
        )
      )}
    </>
  );
}

export default Checkout;
