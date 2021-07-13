import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { data } from "./mockData";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
function Checkout() {
  const cartItems = useSelector((state) => state.cart.data);
  const [show, setShow] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mockData, setMockdata] = useState(false);
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

  const submitHandler = async (e) => {
    const amount =
      cartItems.reduce((accu, cur) => accu + cur.quantityPrice, 0) * 100;

    e.preventDefault();
    setIsProcessing(true);
    //prettier-ignore
    const { data: client_secret } = await axios.post('/create-payment-intent',{amount});
    const cardElement = elements.getElement(CardElement);

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
    console.log(confirmCardPayment);
  };

  return (
    <>
      {confirmed ? (
        <h1>Confirmed!!</h1>
      ) : (
        <>
          {" "}
          <Button variant="primary" onClick={() => setShow(true)}>
            Continue to Checkout
          </Button>
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
                <Col>
                  <Modal.Body>
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
                          type="Name"
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
                          type="Address"
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
                          type="City"
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
                          type="State"
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
                          type="Zip Code"
                          placeholder="Zip Code"
                          style={{ width: "250px" }}
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Body>
                    <h3>Shipping method</h3>
                    <Form.Check
                      type="radio"
                      label="Free Shipping"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      type="radio"
                      label="Ground Shipping"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                      type="radio"
                      label="FedEx 2Day"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios3"
                    />
                    <Form.Check
                      type="radio"
                      label="FedEx Overnight"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios3"
                    />
                  </Modal.Body>
                </Col>
                <Col>
                  <Modal.Body>
                    <h3>Order Summary</h3>
                    <h5>
                      Total price:
                      {cartItems.reduce(
                        (accu, cur) => accu + cur.quantityPrice,
                        0
                      )}
                    </h5>

                    <Button
                      variant="danger"
                      onClick={submitHandler}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing.." : "checkout"}
                    </Button>
                    <Button onClick={() => mockHandler()}>Load Data</Button>
                    <CardElement></CardElement>
                  </Modal.Body>
                </Col>
              </Row>
            </Form>
          </Modal>{" "}
        </>
      )}
    </>
  );
}

export default Checkout;
