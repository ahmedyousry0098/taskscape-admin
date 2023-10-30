import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance";
import { toast } from "react-toastify";

export const allEmployees = createAsyncThunk<void>(
  "All_Employee/allEmployees",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/employee/getAllEmployee/${orgnizationId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

type initialStateType = {
  isLoading: boolean;
  getAll: any;
  error: string;
};

const initialState: initialStateType = {
  isLoading: false,
  getAll: [],
  error: "",
};

export const AllEmpSlice = createSlice({
  name: "All_Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allEmployees.fulfilled, (state, action: any) => {
        if (action.payload !== undefined) {
          state.getAll = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(allEmployees.rejected, (state, action) => {
        state.isLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error("Something went wrong");
        }
      });
  },
});

export let allEmployeesReducer = AllEmpSlice.reducer;
