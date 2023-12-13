export const orders = [
  {
    _id: 1,
    success: true,
    name: "bun",
    status: "pending",
    ingredients: [],
    number: 1,
    createdAt: "",
    updatedAt: "",
  },
];

export const mockIngredients = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
];

export const mockOrderFetchResponse = {
  success: true,
  name: "Фалленианский  бургер",
  order: {
    ingredients: [
      {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "",
        image_mobile: "",
        image_large: "",
        __v: 0,
      },
    ],
    _id: "6577599d7fd657001ba0846a",
    owner: {
      name: "Usver",
      email: "vvnezapnopwnz@gmail.com",
      createdAt: "2023-09-24T18:41:08.029Z",
      updatedAt: "2023-11-08T12:32:59.687Z",
    },
    status: "done",
    name: "Фалленианский бургер",
    createdAt: "2023-12-11T18:49:01.865Z",
    updatedAt: "2023-12-11T18:49:02.464Z",
    number: 28899,
    price: 19010,
  },
};

export const mockSingleIngredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "",
  image_mobile: "",
  image_large: "",
  __v: 0,
};

export const user = {
  email: "vvnezapnopwnz@gmail.com",
  name: "Usver",
};

export const mockOrderIngredients = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
];

export const mockOrderResponse = {
  success: true,
  name: "Фалленианский  бургер",
  order: {
    ingredients: [
      {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "",
        image_mobile: "",
        image_large: "",
        __v: 0,
      },
    ],
    _id: "6577599d7fd657001ba0846a",
    owner: {
      name: "Usver",
      email: "vvnezapnopwnz@gmail.com",
      createdAt: "2023-09-24T18:41:08.029Z",
      updatedAt: "2023-11-08T12:32:59.687Z",
    },
    status: "done",
    name: "Фалленианский бургер",
    createdAt: "2023-12-11T18:49:01.865Z",
    updatedAt: "2023-12-11T18:49:02.464Z",
    number: 28899,
    price: 19010,
  },
};
