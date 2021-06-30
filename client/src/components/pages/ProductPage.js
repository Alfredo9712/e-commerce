import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id, category } = useParams();

  return (
    <div>
      <h1>ID: {id} </h1>
      ID: {category}
    </div>
  );
};

export default ProductPage;
