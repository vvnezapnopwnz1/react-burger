import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
  logout,
  getUserData,
  editUserData,
  refreshToken,
} from "../../utils/burger-api";

const initialState = {
  userData: null,
  accessToken: null,
  loading: "idle",
  error: null,
};
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  return await login(formData);
});
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    return await register(formData);
  }
);
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return await logout();
});
export const getUser = createAsyncThunk("auth/getUser", async (token) => {
  return await getUserData(token);
});

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ token, field, value }) => {
    return await editUserData(token, field, value);
  }
);

export const refreshUserToken = createAsyncThunk(
  "auth/refreshUserToken",
  async () => {
    return await refreshToken();
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.userData = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.userData = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.userData = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.loading = "idle";
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      });
  },
});

export const { setIngredients, addIngredient, setBun, sortIngredients } =
  authSlice.actions;
export default authSlice.reducer;
