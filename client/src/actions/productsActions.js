import axios from "axios";
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/all-products");
    const data = [...res.data];

    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  } catch (err) {}
};

export const getShirts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/shirts");
    const data = [...res.data];

    dispatch({
      type: "GET_SHIRTS",
      payload: data,
    });
  } catch (err) {}
};

export const filterProducts = (search) => async (dispatch) => {
  const res = await axios.get("http://localhost:5000/api/all-products");
  const data = [...res.data];
  const filteredProduct = data.filter((product) => product.category === search);
  dispatch({
    type: "FILTER_PRODUCTS",
    payload: filteredProduct,
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

    await axios.put(
      `http://localhost:5000/api/${cartItem.category}/${cartItem.id}`,
      { sizes }
    );
    const res = await axios.get("http://localhost:5000/api/all-products");
  });
};
