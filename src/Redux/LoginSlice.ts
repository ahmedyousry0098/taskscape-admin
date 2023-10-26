import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin } from "../shared/Interfaces/authentication.interface";
import { axiosInstance } from "../App/AxiosInstance";
import { toast } from "react-toastify";

export const logIn = createAsyncThunk<void, ILogin>(
  "Login/logIn",
  async (values) => {
    const response = await axiosInstance.post(`/admin/login`, values);
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    admin: "",
    error: "",
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
      .addCase(logIn.pending, (state, action) => {
        state.loading = true;
        state.isLoggedIn = false;
        state.admin = "";
        state.error = "";
      })
      .addCase(logIn.fulfilled, (state: any, action: any) => {
        state.admin = action.payload;
        state.error = "";
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.admin = "";
        state.loading = false;
        state.isLoggedIn = false;
        if (action.error.message === "Request failed with status code 400") {
          toast.error("ُWrong Email or Password");
        } else {
          toast.error("something went wrong please try again");
        }
      });
  },
});

export let loginReducer = LoginSlice.reducer;
export let { logout, decoding }: any = LoginSlice.actions;
