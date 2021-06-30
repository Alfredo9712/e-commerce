import './App.css';
import React, { useEffect, useState } from 'react';
import NavbarComponent from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ProductPage from './components/pages/ProductPage';
const App = () => {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route path='/product/:category/:id' component={ProductPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
