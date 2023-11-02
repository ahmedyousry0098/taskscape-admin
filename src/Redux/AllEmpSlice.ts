import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance";
import { toast } from "react-toastify";

export const allEmployees = createAsyncThunk<void>(
  "All_Employee/allEmployee",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/employee/getAllEmployees/${orgnizationId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details[0]);
      toast.error(error.response.data.error);
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
        `/employee/getAllScrums/${orgnizationId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details[0]);
      toast.error(error.response.data.error);
    }
  }
);

type initialStateType = {
  EmployeeLoading: boolean;
  ScrumLoading: boolean;
  getAllEmployees: any;
  getScrums: any;
  error: string;
};

const initialState: initialStateType = {
  EmployeeLoading: false,
  ScrumLoading: false,
  getAllEmployees: [],
  getScrums: [],
  error: "",
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
          toast.error("Something went wrong");
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
          toast.error("Something went wrong");
        }
      });
  },
});

export let allEmployeesReducer = AllEmpSlice.reducer;
