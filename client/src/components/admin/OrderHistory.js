import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tab, Nav, Button } from 'react-bootstrap';
import axios from 'axios';
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  const getOrders = async () => {
    const response = await axios.get('/api/order');
    setOrders(response.data);
    setPendingOrders(response.data.filter((order) => order.complete === false));
    setCompleteOrders(response.data.filter((order) => order.complete === true));
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
  const confirmHandler = (id) => {
    const newOrders = orders.map((order) => {
      return order._id === id ? { ...order, complete: true } : order;
    });
    setOrders(newOrders);
    setPendingOrders(newOrders.filter((order) => order.complete === false));
    setCompleteOrders(newOrders.filter((order) => order.complete === true));
  };
  useEffect(() => {
    getOrders();
    console.log(orders);
  }, []);
  return (
    <>
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
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id.slice(order._id.length - 5)}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.complete === false ? 'pending' : 'true'}</td>
              <td>${order.amount}</td>
              <td>
                {order.complete === false ? (
                  <Button
                    variant='dark'
                    onClick={() => confirmHandler(order._id)}
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
    </>
  );
};

export default OrderHistory;
