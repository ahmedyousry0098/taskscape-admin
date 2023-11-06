import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IJwtPayload,
  ILogin,
} from "../../shared/Interfaces/authentication.interface";
import { axiosInstance } from "../AxiosInstance";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const logIn = createAsyncThunk<void, ILogin>(
  "Login/logIn",
  async (values) => {
    try {
      const response = await axiosInstance.post(`/admin/login`, values);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.details);
      toast.error(error.response.data.error);
    }
  }
);

function decodeToken(token: string) {
  try {
    const decoded = jwtDecode<IJwtPayload>(token);
    return decoded;
  } catch (err: any) {
    return err.message;
  }
}
type initialStateType = {
  error: string;
  loading: boolean;
  isLoggedIn: boolean;
  token: string;
  decoded: {
    _id: string;
    email: string;
    orgId: string;
  };
};
const initialState: initialStateType = {
  error: "",
  loading: false,
  isLoggedIn: false,
  token: "",
  decoded: {
    _id: "",
    email: "",
    orgId: "",
  },
};

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    loggedIn: (state) => {
      const token = localStorage.getItem("token");
      if (!token) {
        state.isLoggedIn = false;
        state.decoded = initialState.decoded;
        return;
      }

      const decode = decodeToken(token);

      if (typeof decode == "string") {
        state.decoded = initialState.decoded;
        state.isLoggedIn = false;
        return;
      }
      state.decoded = decode;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.decoded = {
        _id: "",
        email: "",
        orgId: "",
      };
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action: any) => {
        console.log(action);

        if (action.payload !== undefined) {
          localStorage.setItem("token", action.payload.token);
        }
        state.loading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        console.log(action);

        if (action.error.message === "Request failed with status code 400") {
          toast.error("ُSomething went wrong please try again later");
        }
      });
  },
});

export let loginReducer = LoginSlice.reducer;
export let { logout, loggedIn } = LoginSlice.actions;