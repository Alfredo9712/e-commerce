import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
function App() {
  const [products, setProducts] = useState([]);
  const fetchApi = async () => {
    const res = await axios.get('http://localhost:5000/product');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className='App'>
      <Button className='btn-primary'>button</Button>
      {products.map((product) => (
        <img src={product.image} />
      ))}
    </div>
  );
}

export default App;
