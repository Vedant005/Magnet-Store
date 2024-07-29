import { GET_ALL_PRODUCTS, GET_CATEGORIES } from "../variables/variables";

const productReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      // console.log("Reducer action payload:", action.payload);
      return { ...state, products: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default productReducer;
