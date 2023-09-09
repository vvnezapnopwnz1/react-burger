export default function modalReducer(state, action) {
  switch (action.type) {
    case "ingredient_details": {
      return {
        isOrder: false,
        ingredient: action.ingredient,
      };
    }
    case "order_details": {
      return {
        isOrder: true,
        ingredient: null,
      };
    }
    case "close_modal": {
      return {
        isOrder: false,
        ingredient: null,
      };
    }
    default: {
      throw Error("Unknown action.");
    }
  }
}
