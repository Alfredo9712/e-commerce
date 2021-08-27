import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: {
    'x-auth-token': token,
  },
};
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/all-products');
    const data = [...res.data];

    dispatch({
      type: 'GET_PRODUCTS',
      payload: data,
    });
  } catch (err) {}
};

export const getShirts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/shirts');
    const data = [...res.data];

    dispatch({
      type: 'GET_SHIRTS',
      payload: data,
    });
  } catch (err) {}
};
export const getPants = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/pants');
    const data = [...res.data];

    dispatch({
      type: 'GET_PANTS',
      payload: data,
    });
  } catch (err) {}
};

export const filterProducts = (matches) => async (dispatch) => {
  // const res = await axios.get('http://localhost:5000/api/all-products');
  // const data = [...res.data];
  // // const SHIRTS = 'shirts'
  // // const PANTS = 'pants'

  // const filteredCategory = data.filter(
  //   (product) => product.category === text || product.product === text
  // );
  dispatch({
    type: 'FILTER_PRODUCTS',
    payload: matches,
  });
};

export const updateProducts = (cart) => async (dispatch) => {
  cart.forEach(async (cartItem) => {
    const allSizes = [...cartItem.sizes];
    const sizes = allSizes.map((size) =>
      size.size === cartItem.selectedSize
        ? {
            size: size.size,
            quantity: cartItem.originalQuantity - cartItem.selectedQuantity,
            price: size.price,
          }
        : { size: size.size, quantity: size.quantity, price: size.price }
    );
    // cartItem.originalQuantity - cartItem.selectedQuantity,
    // const test = await axios.get('http://localhost:5000/api/test');

    await axios.put(`/api/${cartItem.category}/${cartItem.id}`, { sizes });
    const res = await axios.get('/api/all-products');
  });
};

export const deleteProduct = (category, id) => async (dispatch) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  const response = await axios.delete(`/api/admin/${category}/${id}`, config);
  console.log(response);

  dispatch({
    type: 'DELETE_PRODUCT',
    payload: id,
  });
};

export const editProduct = (updatedProduct) => async (dispatch) => {
  const { _id, category, product, image, sizes } = updatedProduct;
  const response = await axios.put(
    `/api/${category}/update/${_id}`,
    { category, product, image, sizes },
    config
  );
  console.log(updateProduct);
  console.log(response);

  dispatch({
    type: 'EDIT_PRODUCT',
    payload: updatedProduct,
  });
};

export const paginateProducts = (start, end) => async (dispatch) => {
  const result = await axios.get(`api/paginated-products/${start}/${end}`);
  const data = result.data.paginatedProducts;
  const length = result.data.length;
  // console.log(data);

  dispatch({
    type: 'PAGINATE_PRODUCT',
    payload: data,
    length,
  });
};
