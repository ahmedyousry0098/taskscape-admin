import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance";
import { IProject } from "../shared/Interfaces/authentication.interface";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export const createProject = createAsyncThunk<void, IProject>(
  "Create_Project/createProject",
  async (values) => {
    try {
      const response = await axiosInstance.post(`/project/create`, values);
      console.log(response);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details);
      toast.error(error.response.data.error);
    }
  }
);

export const CreateProjectSlice = createSlice({
  name: "Create_Project",
  initialState: {
    loading: false,
    done: false,
    projects: [],
    error: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.done = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.done = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.done = false;
      });
  },
});

export let createProjectReducer = CreateProjectSlice.reducer;
