import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance";
import { toast } from "react-toastify";
import { loggedIn } from "./LoginSlice";
import jwtDecode from "jwt-decode";
import { IJwtPayload } from "../shared/Interfaces/authentication.interface";

export const allProjects = createAsyncThunk<void>(
  "All_projects/allProjects",
  async () => {
    try {
      loggedIn();
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode<IJwtPayload>(token);
      const response = await axiosInstance.get(
        `/project/org-projects/${decoded.orgId}`
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

type initialStateType = {
  isLoading: boolean;
  getAllProjects: any;
  error: string;
};

const initialState: initialStateType = {
  isLoading: false,
  getAllProjects: [],
  error: "",
};

export const AllProjectSlice = createSlice({
  name: "All_projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allProjects.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.getAllProjects = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(allProjects.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error("Something went wrong");
        }
      });
  },
});

export let allProjectsReducer = AllProjectSlice.reducer;
