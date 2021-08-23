import React, { useState } from "react";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Button, Modal, Col, Row, ListGroup } from "react-bootstrap";
const OrderModal = ({ order }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(order);
  return (
    <div className="width">
      <OpenInNewIcon onClick={handleShow} />

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Billing Details #{order._id.slice(order._id.length - 5)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ paddingLeft: "60px", paddingRight: "60px" }}>
            <Col md={8}>
              <h5>Order Info</h5>
              <div
                style={{
                  padding: "10px",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
                  borderRadius: "15px",
                }}
              >
                <h6 className="text-muted" style={{ display: "inline-block" }}>
                  Customer -{" "}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {order.billingDetails.name}
                </h6>
                <br></br>
                <h6 className="text-muted" style={{ display: "inline-block" }}>
                  Email -{" "}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {order.billingDetails.email}
                </h6>
                <br></br>
                <h6 className="text-muted" style={{ display: "inline-block" }}>
                  City -{""}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {order.billingDetails.address.city}
                </h6>
                <br></br>
                <h6 className="text-muted" style={{ display: "inline-block" }}>
                  Adress -{" "}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {order.billingDetails.address.line1}
                </h6>
                <br></br>
                <h6 className="text-muted" style={{ display: "inline-block" }}>
                  Postal code -{" "}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {order.billingDetails.address.postal_code}
                </h6>
                <br></br>
                <h6 className="text-muted" style={{ display: "inline-block" }}>
                  State -{" "}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {order.billingDetails.address.state}
                </h6>
              </div>
            </Col>
            <Col md={4}>
              <h5>Order</h5>
              <div
                style={{
                  padding: "10px",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.24)",
                  borderRadius: "15px",
                }}
              >
                <ListGroup variant="flush">
                  {order.order.map((i) => (
                    <ListGroup.Item>
                      <h6 className="text-muted">
                        {" "}
                        {i.quantityPurchased} {i.product}(s)
                      </h6>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderModal;
