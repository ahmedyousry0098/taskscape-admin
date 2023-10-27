import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance, decoded } from "../App/AxiosInstance";
import { toast } from "react-toastify";

export const allEmployees = createAsyncThunk<void>(
  "All_Employee/allEmployees",
  async () => {
    try {
      const response = await axiosInstance.get(
        `/employee/getAllEmployee/${decoded.orgId}`
      );
      console.log(response.data);

      return response.data;
    } catch (error) {}
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
        state.error = "";
      })
      .addCase(allEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAll = action.payload!;
        state.error = "";
      })
      .addCase(allEmployees.rejected, (state, action) => {
        state.isLoading = false;

        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error("Hn4of el action");
        } else {
          toast.error("Something went wrong");
        }
      });
  },
});

export let allEmployeesReducer = AllEmpSlice.reducer;
