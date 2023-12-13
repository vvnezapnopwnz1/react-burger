import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  login,
  register,
  logout,
  getUserData,
  editUserData,
} from "../../utils/burger-api";
import { TUser } from "../../types";

type state = {
  loading: string;
  error: null | SerializedError;
  userData: TUser | null;
};

export const initialState: state = {
  userData: null,
  loading: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: Record<string, string>) => {
    return await login(formData);
  }
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData: Record<string, string>) => {
    return await register(formData);
  }
);
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return await logout();
});
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { getState }) => {
    return await getUserData();
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ field, value }: { field: string; value: string }) => {
    return await editUserData(field, value);
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
      .addCase(editUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = "idle";
          state.userData = action.payload.user;
        }
      })
      .addCase(editUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error;
      });
  },
});

export default authSlice;
