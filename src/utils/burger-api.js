import { NORMA_API } from "./config";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
  const res = await fetch(`${NORMA_API}/ingredients`);
  return checkReponse(res);
}

export async function getOrderNumber(constructorIngredients, bun) {
  const ingredientsIds = [
    bun._id,
    ...constructorIngredients.flatMap((ingredient) =>
      Array.from(new Array(ingredient.count), () => ingredient._id)
    ),
    bun._id,
  ];
  const res = await fetch(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });
  return checkReponse(res);
}
