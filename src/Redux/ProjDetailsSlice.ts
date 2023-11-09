import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";
import {
  UpdateProject,
  AddEmpOfProj,
  DeleteEmpOfProj,
} from "../shared/Interfaces/authentication.interface";

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

export const delEmployeeFromProject = createAsyncThunk<void, DeleteEmpOfProj>(
  "Project_Details/delEmployeeFromProject",
  async (body) => {
    try {
      const response = await axiosInstance.patch(
        `/project/del-employee`,
        body,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

export const addEmployeeToProject = createAsyncThunk<void, AddEmpOfProj>(
  "Project_Details/addEmployeeToProject",
  async (values) => {
    try {
      const response = await axiosInstance.patch(
        `/project/add-employee`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message);
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
  editLoading: boolean;
  error: string;
  deleteLoading: boolean;
  delLoading: boolean;
  addLoading: boolean;
};

const initialState: initialStateType = {
  isLoading: false,
  getprojectDetails: [],
  editLoading: false,
  error: "",
  deleteLoading: false,
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
          toast.error(state.error);
        }
      });

    builder
      .addCase(updateProject.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action: any) => {
        state.editLoading = false;
        if (action.payload !== undefined) {
          state.getprojectDetails = {
            details: action.payload.updated_project,
          };
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.editLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(delEmployeeFromProject.pending, (state) => {
        state.delLoading = true;
      })
      .addCase(delEmployeeFromProject.fulfilled, (state, action: any) => {
        state.delLoading = false;
        if (action.payload !== undefined) {
          let delId = action.payload.deleted_employee._id;

          const getprojectDetails =
            state.getprojectDetails.details.employees.filter(
              (emp: any) => emp._id !== delId
            );
          state.getprojectDetails.details.employees = getprojectDetails;
        }
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
      .addCase(addEmployeeToProject.fulfilled, (state, action: any) => {
        state.addLoading = false;
        if (action.payload !== undefined) {
          state.getprojectDetails.details.employees.push(
            ...action.payload.added_employees
          );
        }
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

export let projectDetailsReducer = ProjectDetailslice.reducer;
