import React, { useState, useEffect } from 'react';
import {
  Table,
  Tabs,
  Tab,
  Nav,
  Button,
  Modal,
  Col,
  Row,
  ListGroup,
  Spinner,
} from 'react-bootstrap';

import axios from 'axios';
import OrderModal from './OrderModal';
import emailjs from 'emailjs-com';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completeOrders, setCompleteOrders] = useState([]);
  const [emailResult, setEmailResult] = useState('');
  const [emailError, setEmailError] = useState('');
  const getOrders = async () => {
    const response = await axios.get('/api/order');
    setOrders(
      response.data.sort(function (x, y) {
        // true values first
        return x.complete === y.complete ? 0 : x.complete ? 1 : -1;
        // false values first
        // return (x === y)? 0 : x? 1 : -1;
      })
    );
    setPendingOrders(response.data.filter((order) => order.complete === false));
    setCompleteOrders(response.data.filter((order) => order.complete === true));
    setLoading(false);
  };
  const orderHandler = (filter) => {
    switch (filter) {
      case 'pending':
        setOrders(pendingOrders);
        break;
      case 'all':
        getOrders();
        break;
      case 'complete':
        setOrders(completeOrders);
        break;
    }
  };
  const confirmHandler = async (id, complete, name, email) => {
    const emailParams = {
      orderNumber: id.slice(id.length - 5),
      name,
      clientEmail: email,
    };
    const newOrders = orders
      .map((order) => {
        return order._id === id ? { ...order, complete: true } : order;
      })
      .sort(function (x, y) {
        // true values first
        return x.complete === y.complete ? 0 : x.complete ? 1 : -1;
        // false values first
        // return (x === y)? 0 : x? 1 : -1;
      });
    await axios.put(`/api/order/${id}`, {
      complete: true,
    });
    setOrders(newOrders);

    setPendingOrders(newOrders.filter((order) => order.complete === false));
    setCompleteOrders(newOrders.filter((order) => order.complete === true));
    emailjs
      .send(
        'service_wr8fymg',
        'template_d2mq8tr',
        emailParams,
        'user_pGAwoYSZYBM0A4ixJh7kp'
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
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner
          animation='border'
          style={{
            display: 'block',
            position: 'fixed',
            zIndex: '1031',
            top: '50%',
            right: '50%',
            marginTop: '-..px',
            marginRight: '-..px',
          }}
        />
      ) : (
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <h1 style={{ marginBottom: '20px' }}>Orders</h1>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav variant='pills' className='flex-row'>
              <Nav.Item>
                <Nav.Link
                  eventKey='first'
                  onClick={() => {
                    orderHandler('all');
                  }}
                >
                  All
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() => {
                    orderHandler('pending');
                  }}
                >
                  Pending
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='third'
                  onClick={() => {
                    orderHandler('complete');
                  }}
                >
                  Complete
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
          <Table size='sm' striped bordered hover style={{ marginTop: '30px' }}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Order Details</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(order._id.length - 5)}</td>
                  <td>{order.billingDetails.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.complete === false ? 'pending' : 'complete'}</td>
                  <td>${order.amount}</td>
                  <td>
                    <OrderModal order={order} />
                  </td>
                  <td>
                    {order.complete === false ? (
                      <Button
                        variant='dark'
                        onClick={() =>
                          confirmHandler(
                            order._id,
                            order.complete,
                            order.billingDetails.name,
                            order.billingDetails.email
                          )
                        }
                      >
                        {' '}
                        Confirm
                      </Button>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
