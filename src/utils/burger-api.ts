import {
  TOrderNumberResponse,
  TIngredientsResponse,
  TLoginOrRegisterResponse,
  TRefreshResponse,
  TOrdersResponse,
} from "../types";
import { NORMA_API } from "./config";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {
  const res = await fetch(`${NORMA_API}/ingredients`);
  let result = await checkResponse<TIngredientsResponse>(res);
  return result;
}

export async function getOrderNumber(ingredientsIds: string[]) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const res = await fetch(`${NORMA_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    });
    return checkResponse<TOrderNumberResponse>(res);
  }
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${NORMA_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  return checkResponse(res);
}

export async function resetPassword({
  password,
  token,
}: Record<string, string>) {
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
  return checkResponse(res);
}

export async function login({ email, password }: Record<string, string>) {
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
  return checkResponse<TLoginOrRegisterResponse>(res).then((data) => {
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  });
}

export async function register({
  email,
  password,
  name,
}: Record<string, string>) {
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
  return checkResponse<TLoginOrRegisterResponse>(res).then((data) => {
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
  return checkResponse(res).then(() => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    return;
  });
}

export async function getUserData() {
  const token = localStorage.getItem("accessToken");
  if (token) {
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
  }
  if (localStorage.getItem("refreshToken")) {
    let token: string;
    return refreshToken()
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

export async function editUserData(field: string, value: string) {
  const token = localStorage.getItem("accessToken");
  if (token) {
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
    return checkResponse<TLoginOrRegisterResponse>(res).then((data) => {
      return data;
    });
  }
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
  return checkResponse<TRefreshResponse>(res).then((data) => {
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  });
}

export async function getOrder(id: string) {
  const res = await fetch(`${NORMA_API}/orders/${id}`);
  let result = await checkResponse<TOrdersResponse>(res);
  return result;
}
