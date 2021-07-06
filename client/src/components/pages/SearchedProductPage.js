import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { filterProducts, getProducts } from '../../actions/productsActions';
const SearchedProductPage = () => {
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const { product } = useParams();
  const dispatch = useDispatch();
  console.log(product);
  useEffect(() => {
    dispatch(filterProducts(product));
  }, [dispatch, product]);
  return <div>{product}</div>;
};

export default SearchedProductPage;
