import { NORMA_API } from "./config";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
  const res = await fetch(`${NORMA_API}/ingredients`);
  return checkReponse(res);
}

export async function getOrderNumber(ingredientsIds) {
  const res = await fetch(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
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
    localStorage.setItem("accessToken", data.accessToken);
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
    localStorage.setItem("accessToken", data.accessToken);
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
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    return data;
  });
}

export async function getUserData() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${NORMA_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (res.ok) {
    return res.json();
  }
  if (localStorage.getItem("refreshToken")) {
    let token;
    return refreshToken(localStorage.getItem("refreshToken"))
      .then(({ accessToken, refreshToken }) => {
        token = accessToken;
        localStorage.setItem("refreshToken", refreshToken);
        return fetch(`${NORMA_API}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });
      })
      .then(async (data) => {
        let userData = await data.json();
        localStorage.setItem("accessToken", token);
        return { ...userData };
      })
      .catch(() => Promise.reject());
  } else {
    return Promise.reject();
  }
}

export async function editUserData(field, value) {
  const res = await fetch(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
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
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  });
}
