import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { filterProducts, getProducts } from "../../actions/productsActions";

import SearchIcon from "@material-ui/icons/Search";
const SearchedProductPage = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [matches, setMatches] = useState([]);
  // const { product } = useParams();
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.data);
  const getClientProducts = async () => {
    const request = await axios("/api/all-products");
    setData(request.data);
  };
  useEffect(() => {
    getClientProducts();
  }, []);
  const filterHandler = (text) => {
    setSearch(text);
    console.log(text);
    if (text.length === 0) {
      dispatch(getProducts());
      setMatches([]);

      return;
    } else {
      setMatches(
        data.filter((product) => {
          const regex = new RegExp(`^${text}`, "gi");
          return product.product.match(regex) || product.category.match(regex);
        })
      );
      console.log(matches);
    }
  };
  const searchHandler = (e) => {
    e.preventDefault();
    if (matches.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    } else {
      getClientProducts();

      dispatch(filterProducts(matches));
    }
  };
  return (
    <Form onSubmit={(e) => searchHandler(e)}>
      {error && <Alert variant="warning">Product not found</Alert>}

      <FormControl
        style={{ width: 700, borderRadius: "20px" }}
        className="searchBar"
        type="text"
        placeholder="search..."
        value={search}
        onChange={(e) => filterHandler(e.target.value)}
      />
    </Form>
  );
};

export default SearchedProductPage;
