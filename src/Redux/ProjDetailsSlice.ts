import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";
import { UpdateProject } from "../shared/Interfaces/authentication.interface";

export const projectDetails = createAsyncThunk<void, string>(
  "Project_Details/projectDetails",
  async (projectId) => {
    try {
      const response = await axiosInstance.get(
        `/project/details/${projectId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

export const deleteProject = createAsyncThunk<void, string>(
  "Project_Details/deleteProject",
  async (projectId) => {
    try {
      const response = await axiosInstance.delete(`/project/${projectId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

export const updateProject = createAsyncThunk<
  void,
  { values: UpdateProject; projectId: string }
>("Project_Details/updateProject", async ({ values, projectId }) => {
  try {
    const response = await axiosInstance.put(
      `/project/update/${projectId}`,
      values,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.error);
    toast.error(error.response.data.details[0]);
  }
});

type initialStateType = {
  isLoading: boolean;
  getprojectDetails: any;
  error: string;
  deleteLoading: boolean;
};

const initialState: initialStateType = {
  isLoading: false,
  getprojectDetails: [],
  error: "",
  deleteLoading: false,
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
          toast.error(state.error);
        }
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let projectDetailsReducer = ProjectDetailslice.reducer;
