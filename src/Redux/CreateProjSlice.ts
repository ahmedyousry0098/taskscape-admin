import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { IProject } from "../shared/Interfaces/authentication.interface";
import { toast } from "react-toastify";

export const createProject = createAsyncThunk<void, IProject>(
  "Create_Project/createProject",
  async (values) => {
    try {
      const response = await axiosInstance.post(`/project/create`, values, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details);
      toast.error(error.response.data.message);
    }
  }
);

type initialStateType = {
  loading: boolean;
  projects: string[];
  error: string;
};

let initialState: initialStateType = {
  loading: false,
  projects: [],
  error: "",
};

export const CreateProjectSlice = createSlice({
  name: "Create_Project",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let createProjectReducer = CreateProjectSlice.reducer;
