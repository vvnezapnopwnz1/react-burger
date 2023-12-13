import { configureStore } from "@reduxjs/toolkit";
import userSlice, {
  getUser,
  logoutUser,
  loginUser,
  registerUser,
  editUser,
} from "./userReducer";
import { user } from "../../utils/mock";

describe("user", () => {
  const store = configureStore({ reducer: userSlice.reducer });

  it("GetUser - should change status with getUser.pending action", () => {
    store.dispatch(getUser.pending("user"));
    expect(store.getState().loading).toBe("pending");
    expect(store.getState().error).toBe(null);
  });
  it("GetUser should change current user data with getUser.fulfilled action", () => {
    const mockResponce = {
      success: true,
      user: { email: "vvnezapnopwnz@gmail.com", name: "Usver" },
    };
    store.dispatch(getUser.fulfilled({ user: mockResponce.user }, ""));

    expect(store.getState().userData?.name).toBe(user.name);
  });

  it("RegisterUser should change current user data with getUser.fulfilled action", () => {
    const mockResponce = {
      success: true,
      user: { email: "vvnezapnopwnz@gmail.com", name: "Usver" },
    };
    store.dispatch(
      registerUser.fulfilled(
        {
          refreshToken: "",
          accessToken: "",
          user: mockResponce.user,
          success: true,
        },
        "",
        mockResponce.user
      )
    );

    expect(store.getState().userData?.name).toBe(user.name);
    expect(store.getState().userData?.email).toBe(user?.email);
  });
  it("LoginUser should change current user data with getUser.fulfilled action", () => {
    const mockResponce = {
      success: true,
      user: { email: "vvnezapnopwnz@gmail.com", name: "Usver" },
    };
    store.dispatch(
      loginUser.fulfilled(
        {
          refreshToken: "",
          accessToken: "",
          user: mockResponce.user,
          success: true,
        },
        "",
        mockResponce.user
      )
    );

    expect(store.getState().userData?.name).toBe(user.name);
    expect(store.getState().userData?.email).toBe(user?.email);
  });

  it("EditUser should change current user data with getUser.fulfilled action", () => {
    const mockResponce = {
      success: true,
      user: { email: "vvnezapnopwnz@gmail.com", name: "User" },
    };
    store.dispatch(
      editUser.fulfilled(
        {
          refreshToken: "",
          accessToken: "",
          user: mockResponce.user,
          success: true,
        },
        "",
        { field: "name", value: "User" }
      )
    );

    expect(store.getState().userData?.name).toBe("User");
  });

  it("Logout should change current user data with getUser.fulfilled action", () => {
    store.dispatch(logoutUser.rejected(Error("Rejected"), "ingredients"));
    expect(store.getState().error?.message).toEqual("Rejected");
  });
});
