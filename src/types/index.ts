export type TIngredient = {
  type: string;
  name: string;
  price: number;
  image: string;
  _id: string;
  calories: string;
  fat: string;
  carbohydrates: string;
  image_large: string;
  proteins: string;
  count?: number;
  uuid?: number;
};

export type TUser = {
  email: string;
  name: string;
  password?: string;
};

export type TOrderNumberResponse = {
  success: boolean;
  name: string;
  order: {
    ingredients: Array<TIngredient>;
    name: string;
    number: number;
    price: number;
    status: string;
    _id: string;
    updatedAt: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type TServerResponse<T> = {
  success: boolean;
} & T;

//
export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export type TLoginOrRegisterResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;
