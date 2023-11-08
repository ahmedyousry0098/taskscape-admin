import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";

export const allEmployees = createAsyncThunk<void>(
  "All_Employee/allEmployee",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/employee/getAllEmployees/${orgnizationId}`,
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

export const allScrums = createAsyncThunk<void>(
  "All_Employee/allScrums",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/employee/getAllScrums/${orgnizationId}`,
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

export const deleteEmployee = createAsyncThunk<void, string>(
  "Project_Details/deleteEmployee",
  async (projectId) => {
    try {
      const response = await axiosInstance.patch(
        `/employee/delete/${projectId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.message);
      console.log(response);

      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

type initialStateType = {
  EmployeeLoading: boolean;
  ScrumLoading: boolean;
  getAllEmployees: any;
  getScrums: any;
  error: string;
  isDeleting: boolean;
};

const initialState: initialStateType = {
  EmployeeLoading: false,
  ScrumLoading: false,
  getAllEmployees: [],
  getScrums: [],
  error: "",
  isDeleting: false,
};

export const AllEmpSlice = createSlice({
  name: "All_Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allEmployees.pending, (state) => {
        state.EmployeeLoading = true;
      })
      .addCase(allEmployees.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.getAllEmployees = action.payload;
        }
        state.EmployeeLoading = false;
      })
      .addCase(allEmployees.rejected, (state, action) => {
        state.EmployeeLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(allScrums.pending, (state) => {
        state.ScrumLoading = true;
      })
      .addCase(allScrums.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.getScrums = action.payload;
        }
        state.ScrumLoading = false;
      })
      .addCase(allScrums.rejected, (state, action) => {
        state.EmployeeLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isDeleting = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let allEmployeesReducer = AllEmpSlice.reducer;
