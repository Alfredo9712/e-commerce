import './App.css';
import React, { useEffect, useState } from 'react';
import NavbarComponent from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
const App = () => {
  const [products, setProducts] = useState([]);
  const fetchApi = async () => {
    const res = await axios.get('http://localhost:5000/product');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
