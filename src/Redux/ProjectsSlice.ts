import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";
import { IProject } from "../shared/Interfaces/authentication.interface";

export const allProjects = createAsyncThunk<void>(
  "All_projects/allProjects",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/project/org-projects/${orgnizationId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

export const createProject = createAsyncThunk<void, IProject>(
  "All_projects/createProject",
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
  isLoading: boolean;
  createLoading: boolean;
  getAllProjects: any;
  error: string;
};

const initialState: initialStateType = {
  isLoading: false,
  createLoading: false,
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

    builder
      .addCase(createProject.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action: any) => {
        state.createLoading = false;
        if (action.payload !== undefined) {
          state.getAllProjects.projects.push(action.payload.project);
        }
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let allProjectsReducer = AllProjectSlice.reducer;
