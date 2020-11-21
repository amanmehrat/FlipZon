import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  // functions in thunk to dispatch an action and access the redux store
  console.log(productId);
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);

    console.log(data + "sfsafaf");

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        qty,
      },
    });
  } catch (error) {
    console.log(error + "sfsafaf");
  }
};
