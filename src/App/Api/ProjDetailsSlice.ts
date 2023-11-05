import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../AxiosInstance";
import { toast } from "react-toastify";

export const projectDetails = createAsyncThunk<void, string>(
  "Project_Details/projectDetails",
  async (projectId) => {
    try {
      const response = await axiosInstance.get(`/project/details/${projectId}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details[0]);
      toast.error(error.response.data.error);
    }
  }
);

type initialStateType = {
  isLoading: boolean;
  getprojectDetails: any;
  error: string;
  delLoading: boolean;
  addLoading: boolean;
};

const initialState: initialStateType = {
  isLoading: false,
  getprojectDetails: [],
  error: "",
  delLoading: false,
  addLoading: false,
};

export const ProjectDetailslice = createSlice({
  name: "Project_Details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(projectDetails.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.getprojectDetails = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(projectDetails.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error("Something went wrong");
        }
      });
  },
});

export let projectDetailsReducer = ProjectDetailslice.reducer;
