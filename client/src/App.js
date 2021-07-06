import './App.css';
import React from 'react';
import NavbarComponent from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import SearchedProductPage from './components/pages/SearchedProductPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductPage from './components/pages/ProductPage';
const App = () => {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path='/about' component={About} />
          <Route path='/product/:category/:id' component={ProductPage} />
          <Route path='/search/:product' component={SearchedProductPage} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
