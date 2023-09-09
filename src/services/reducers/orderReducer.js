export default function orderReducer(state, { type, payload }) {
  switch (type) {
    case "set_ingredients":
      return { orderIngredients: payload.orderIngredients };
    case "set_order":
      return { ...state, orderData: payload.orderData };
    default:
      throw new Error(`Wrong type of : ${type}`);
  }
}
//
