export const initialState = {
  products: [],
  total: 0,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        products: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        products: action.payload,
      };
    case "REMOVE_ALL":
      return {
        ...state,
        products: action.payload,
      };
    case "CALCULATE_TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
};

export default storeReducer;
