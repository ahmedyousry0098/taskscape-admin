import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IForgetPassword,
  IResetPassword,
} from "../shared/Interfaces/authentication.interface";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";

export const forgotPassword = createAsyncThunk<void, IForgetPassword>(
  "reset/forgotPassword",
  async (values) => {
    try {
      const response = await axiosInstance.patch(
        "/admin/forget-password",
        values
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

export const resetPassword = createAsyncThunk<void, IResetPassword>(
  "reset/resetPassword",
  async (values) => {
    try {
      const response = await axiosInstance.patch(
        "/admin/reset-password",
        values
      );
      toast.success(response.data.message);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

type initialStateType = {
  email: string;
  continued: boolean;
  sendingMale: boolean;
  sendingNewPass: boolean;
  finished: boolean;
  error: string;
};

const initialState: initialStateType = {
  email: "",
  continued: false,
  sendingMale: false,
  sendingNewPass: false,
  finished: false,
  error: "",
};

export const ResetPasswordSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.sendingMale = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.sendingMale = false;
        if (action.payload !== undefined) {
          state.email = action.payload;
          state.continued = true;
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.sendingMale = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
        state.continued = false;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.sendingNewPass = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.sendingNewPass = false;
        if (action.payload !== undefined) {
          console.log(action);
          state.finished = true;
          state.continued = false;
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.sendingNewPass = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let resetPasswordReducer = ResetPasswordSlice.reducer;
