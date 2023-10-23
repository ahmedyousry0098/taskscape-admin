import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin } from "../shared/Interfaces/authentication.interface";
import { axiosInstance } from "../App/AxiosInstance";

export const logIn = createAsyncThunk<void, ILogin>(
  "Login/logIn",
  async (values) => {
    await axiosInstance
      .post(`/admin/login`, values)
      .then((res) => {
        if (res.data.message === "Done") {
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    loading: false,
    isLoggedIn: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = true;
      });
  },
});

export let loginReducer = LoginSlice.reducer;
export let { logout, decoding }: any = LoginSlice.actions;
