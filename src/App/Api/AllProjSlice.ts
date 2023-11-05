import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../AxiosInstance";
import { toast } from "react-toastify";
import {
  AddEmpOfProj,
  DeleteEmpOfProj,
} from "../../shared/Interfaces/authentication.interface";

export const allProjects = createAsyncThunk<void>(
  "All_projects/allProjects",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/project/org-projects/${orgnizationId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details[0]);
      toast.error(error.response.data.error);
    }
  }
);

export const delEmployeeFromProject = createAsyncThunk<void, DeleteEmpOfProj>(
  "All_Employee/delEmployeeFromProject",
  async (body) => {
    try {
      const response = await axiosInstance.patch(`/project/del-employee`, body);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details[0]);
      toast.error(error.response.data.error);
    }
  }
);

export const addEmployeeToProject = createAsyncThunk<void, AddEmpOfProj>(
  "All_Employee/addEmployeeToProject",
  async (values) => {
    try {
      const response = await axiosInstance.patch(
        `/project/add-employee`,
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

type initialStateType = {
  isLoading: boolean;
  getAllProjects: any;
  error: string;
  delLoading: boolean;
  addLoading: boolean;
};

const initialState: initialStateType = {
  isLoading: false,
  getAllProjects: [],
  error: "",
  delLoading: false,
  addLoading: false,
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
      .addCase(delEmployeeFromProject.pending, (state) => {
        state.delLoading = true;
      })
      .addCase(delEmployeeFromProject.fulfilled, (state) => {
        state.delLoading = false;
      })
      .addCase(delEmployeeFromProject.rejected, (state, action) => {
        state.delLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(addEmployeeToProject.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addEmployeeToProject.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addEmployeeToProject.rejected, (state, action) => {
        state.addLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let allProjectsReducer = AllProjectSlice.reducer;
