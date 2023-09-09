import { NORMA_API } from "./config";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkReponse);
}

export function getOrderNumber(ingredients) {
  return fetch(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkReponse);
}
