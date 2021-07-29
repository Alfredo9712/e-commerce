import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
const ErrorComponent = () => {
  const [popup, setPopup] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPopup(false);
    }, 2000);
  }, []);
  return <div>{popup && <Alert variant='danger'>hi</Alert>}</div>;
};

export default ErrorComponent;
