import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance";
import { IProject } from "../shared/Interfaces/authentication.interface";
// import { toast } from "react-toastify";

export const createProject = createAsyncThunk<void, IProject>(
  "CreateProjectSlice/createProject",
  async (values) => {
    const response = await axiosInstance.post(`/project/create`, values);
    console.log(response);
    return response.data;
  }
  // async (values) => {
  //   await axiosInstance
  //     .post(`/project/create`, values)
  //     .then((res) => {
  //       console.log(res);
  //       toast.success(res.data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response.data.details[0]);
  //       toast.error(err.response.data);
  //     });
  // }
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
        console.log(action);

        // state.projects = action.payload
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.done = false;
        console.log(action);
      });
  },
});

export let createProjectReducer = CreateProjectSlice.reducer;
