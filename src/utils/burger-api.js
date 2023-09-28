import { NORMA_API } from "./config";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
  const res = await fetch(`${NORMA_API}/ingredients`);
  return checkReponse(res);
}

export async function getOrderNumber(ingredientsIds, token) {
  const res = await fetch(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });
  return checkReponse(res);
}

export async function forgotPassword(email) {
  const res = await fetch(`${NORMA_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  return checkReponse(res);
}

export async function resetPassword({ password, token }) {
  const res = await fetch(`${NORMA_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });
  return checkReponse(res);
}

export async function login({ email, password }) {
  const res = await fetch(`${NORMA_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return checkReponse(res).then((data) => {
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  });
}

export async function register({ email, password, name }) {
  const res = await fetch(`${NORMA_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  return checkReponse(res).then((data) => {
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  });
}

export async function logout() {
  const res = await fetch(`${NORMA_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  return checkReponse(res).then((data) => {
    return data;
  });
}

export async function getUserData(token) {
  const res = await fetch(`${NORMA_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return checkReponse(res).then((data) => {
    return data;
  });
}

export async function editUserData(token, field, value) {
  const res = await fetch(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      [field]: value,
    }),
  });
  return checkReponse(res).then((data) => {
    return data;
  });
}

export async function refreshToken() {
  const res = await fetch(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  return checkReponse(res).then((data) => {
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  });
}
